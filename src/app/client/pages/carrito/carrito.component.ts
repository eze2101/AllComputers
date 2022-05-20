import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../../auth/interfaces/auth.interface';
import { AuthService } from '../../../auth/services/auth.service.service';
import { Producto } from '../../interfaces/prodcuto.interface';
import { ProductosService } from '../../service/productos.service';
import { AbstractControl, NgForm } from '@angular/forms';

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

  constructor(
    private authService: AuthService,
    private productosService: ProductosService
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.usuario;
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

  editar() {
    this.editarHabilitado = true;
  }

  guardar(id: any) {
    let index = this.usuario.carrito.findIndex((el) => el._id == id);
    console.log(this.usuario.carrito[index].unidades);
    const PRODUCTO = this.usuario.carrito[index];
    PRODUCTO.unidades = this.usuario.carrito[index].unidades;
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
}
