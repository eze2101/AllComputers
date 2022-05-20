import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../../auth/interfaces/auth.interface';
import { AuthService } from '../../../auth/services/auth.service.service';
import { Producto } from '../../interfaces/prodcuto.interface';
import { ProductosService } from '../../service/productos.service';
import { AbstractControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  @ViewChild('miFormulario') miFormulario!: NgForm;
  usuario!: Usuario;
  productos: Producto[] = [];
  editarHabilitado: boolean = false;
  editarr: string = '';

  constructor(
    private authService: AuthService,
    private productosService: ProductosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.usuario;

    this.buscarProductos();
    console.log(this.usuario);
  }

  buscarProductos() {
    this.usuario.carrito.map((producto) => {
      this.productosService
        .getProductoID(producto.IDproducto)
        .subscribe((resp) => {
          this.productos.push(resp);
        });
    });
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
