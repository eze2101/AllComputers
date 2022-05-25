import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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
  confirmacion: boolean = false;
  editarHabilitado: boolean = false;
  editarr: string = '';
  index!: number;

  constructor(
    private authService: AuthService,
    private productosService: ProductosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.productos);
    console.log(this.productos == []);

    this.productosService.usuario$.subscribe((id) => {
      (this.usuario = this.authService.usuario),
        (this.index = this.productos.findIndex((el) => el._id == id)),
        this.productos.splice(this.index, 1);
      console.log(this.usuario, this.productos);
    });

    this.usuario = this.authService.usuario;
    console.log(this.usuario);

    this.buscarProductos();
    console.log(this.productos);
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
                this.productosService
                  .vaciarCarrito(this.usuario.uid, this.usuario)
                  .subscribe();
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
