import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Producto } from '../../client/interfaces/prodcuto.interface';
import { AuthService } from '../../auth/services/auth.service.service';
import { Usuario } from '../../auth/interfaces/auth.interface';
import { NgForm } from '@angular/forms';
import { ProductosService } from '../../client/service/productos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjeta-carrito',
  templateUrl: './tarjeta-carrito.component.html',
  styleUrls: ['./tarjeta-carrito.component.css'],
})
export class TarjetaCarritoComponent implements OnInit {
  @ViewChild('miFormulario') miFormulario!: NgForm;
  @Input() producto!: Producto;
  @Input() posicion!: number;
  @Output() price: EventEmitter<any> = new EventEmitter<any>();

  usuario!: Usuario;
  editarHabilitado: boolean = false;
  editarr: string = '';
  imagen!: string;
  index!: number;

  constructor(
    private authService: AuthService,
    private productosService: ProductosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.usuario;
    this.buscarImagen();
    this.buscarEnCarrito();
    this.verPrecio();
  }

  buscarImagen() {
    this.productosService.getImagen(this.producto.img).subscribe((resp) => {
      this.imagen = resp.fileUrl;
    });
  }

  buscarEnCarrito() {
    this.index = this.usuario.carrito.findIndex(
      (el) => el._id == this.producto._id
    );
  }

  editar(name: string) {
    this.editarr = name;
  }

  guardar(id: any) {
    this.editarr = '';
    let index = this.usuario.carrito.findIndex((el) => el._id == id);

    const PRODUCTO = this.usuario.carrito[index];
    PRODUCTO.unidades = this.usuario.carrito[index].unidades;
    PRODUCTO.precio = PRODUCTO.unidades * this.producto.price;

    this.verPrecio();

    const USUARIO: Usuario = {
      name: this.usuario.name,
      email: this.usuario.email,
      carrito: [PRODUCTO],
    };

    this.editarHabilitado = false;

    this.productosService
      .editarUnidadesCarrito(this.usuario.uid, USUARIO)
      .subscribe();
  }

  eliminar(id: any) {
    const USUARIO: Usuario = {
      name: this.usuario.name,
      email: this.usuario.email,
      carrito: [{ IDproducto: id!, unidades: 0, _id: id!, precio: 0 }],
    };

    this.productosService
      .EliminarDelCarrito(this.usuario.uid, USUARIO)
      .subscribe((resp) => {
        this.authService
          .validarToken()
          .subscribe((resp) => this.productosService.usuario$.emit(id));
      });
  }

  verPrecio() {
    let precio = {
      precio: this.usuario.carrito[this.index].precio,
      index: this.posicion,
    };

    this.price.emit(precio);
  }
}
