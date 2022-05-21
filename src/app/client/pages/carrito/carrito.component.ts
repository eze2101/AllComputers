import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../../auth/interfaces/auth.interface';
import { AuthService } from '../../../auth/services/auth.service.service';
import { Producto } from '../../interfaces/prodcuto.interface';
import { ProductosService } from '../../service/productos.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    console.log(this.usuario);

    this.buscarProductos();
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

  comprar() {
    console.log(this.usuario);

    this.productosService
      .procesarCompra(this.usuario.uid, this.usuario)
      .subscribe(
        (ok) => {
          console.log(ok);

          if (ok.ok === true) {
            this.productosService
              .agregarCompra(this.usuario.uid, this.usuario)
              .subscribe((resp) => {
                console.log(resp);
                this.productosService
                  .vaciarCarrito(this.usuario.uid, this.usuario)
                  .subscribe((resp) => console.log(resp));
              });
          }
          Swal.fire({
            icon: 'success',
            text: 'Compra realizada con exito!',
          });
        },
        (error) => {
          console.log(error);

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.msg,
          });
        }
      );
  }
}
