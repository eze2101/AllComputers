import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Producto } from '../../client/interfaces/prodcuto.interface';
import { AuthService } from '../../auth/services/auth.service.service';
import { Usuario } from '../../auth/interfaces/auth.interface';
import { NgForm } from '@angular/forms';
import { ProductosService } from '../../client/service/productos.service';

@Component({
  selector: 'app-tarjeta-carrito',
  templateUrl: './tarjeta-carrito.component.html',
  styleUrls: ['./tarjeta-carrito.component.css'],
})
export class TarjetaCarritoComponent implements OnInit {
  @ViewChild('miFormulario') miFormulario!: NgForm;
  @Input() producto!: Producto;

  usuario!: Usuario;
  editarHabilitado: boolean = false;
  editarr: string = '';
  imagen!: string;
  index!: number;

  constructor(
    private authService: AuthService,
    private productosService: ProductosService
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.usuario;
    this.buscarImagen();
    this.buscarEnCarrito();
  }

  buscarImagen() {
    this.productosService.getImagen(this.producto.img).subscribe((resp) => {
      this.imagen = resp.fileUrl;
      console.log(this.imagen);
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
    console.log(this.usuario.carrito[index].unidades);
    const PRODUCTO = this.usuario.carrito[index];
    PRODUCTO.unidades = this.usuario.carrito[index].unidades;
    console.log(PRODUCTO);

    const USUARIO: Usuario = {
      name: this.usuario.name,
      email: this.usuario.email,
      carrito: [PRODUCTO],
    };

    this.editarHabilitado = false;

    this.productosService
      .editarUnidadesCarrito(this.usuario.uid, USUARIO)
      .subscribe((resp) => console.log(resp));
  }

  eliminar(id: any) {
    console.log(id);

    const USUARIO: Usuario = {
      name: this.usuario.name,
      email: this.usuario.email,
      carrito: [{ IDproducto: id!, unidades: 0, _id: id! }],
    };

    this.productosService
      .EliminarDelCarrito(this.usuario.uid, USUARIO)
      .subscribe((resp) => console.log(resp));
  }
}
