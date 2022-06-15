import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import Swal from 'sweetalert2';

import { ProductosService } from '../../client/service/productos.service';
import { AuthService } from '../../auth/services/auth.service.service';

import { Producto } from '../../client/interfaces/prodcuto.interface';
import { Usuario } from '../../auth/interfaces/auth.interface';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    unidades: [
      null,
      [
        Validators.required,
        Validators.min(1),
        (control: AbstractControl) => Validators.max(this.stock)(control),
      ],
    ],
  });
  producto!: Producto;
  id!: string;
  path!: string;
  admin: boolean = false;
  img: any;
  stock: number = 0;
  usuario!: Usuario;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private productoService: ProductosService
  ) {
    this.admin = this.authService.admin;
    this.usuario = this.authService.usuario;
  }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      this.path = params.get('name')!;
    });

    this.productoService.getProductosSugeridos(this.path!).subscribe((resp) => {
      (this.producto = resp[0]),
        (this.id = this.producto._id!),
        (this.stock = this.producto.stock);
      this.buscarImagen();
    });
  }

  editar(name: string) {
    this.router.navigateByUrl(`/admin/crear-editar-producto/${name}`);
  }

  buscarImagen() {
    this.productoService.getImagen(this.producto.img).subscribe((resp) => {
      this.img = resp;
    });
  }

  comprar() {
    const unidades = this.miFormulario.value.unidades;
    const USUARIO: Usuario = {
      name: this.usuario.name,
      email: this.usuario.email,
      carrito: [
        {
          IDproducto: this.id,
          unidades: unidades,
          _id: this.id,
          precio: unidades * this.producto.price,
        },
      ],
    };

    this.productoService.agregarACarrito(this.usuario.uid!, USUARIO).subscribe(
      (ok) => {
        this.authService.validarToken().subscribe();
        Swal.fire({
          title: `Agregado al carrito `,
          text: '¿Quiere seguir comprando?',
          icon: 'success',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Seguir comprando',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Ir al carrito',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigateByUrl('/home');
          } else {
            this.router.navigateByUrl('/home/carrito');
          }
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.msg,
        });
      }
    );
  }
}
