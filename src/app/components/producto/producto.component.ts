import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Producto } from '../../client/interfaces/prodcuto.interface';
import { ProductosService } from '../../client/service/productos.service';
import { AuthService } from '../../auth/services/auth.service.service';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { Usuario } from '../../auth/interfaces/auth.interface';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit {
  producto!: Producto;
  id!: string;
  path!: string;
  admin: boolean = false;
  img: any;
  stock: number = 0;
  usuario!: Usuario;

  miFormulario: FormGroup = this.fb.group({
    unidades: [
      '',
      [
        Validators.required,
        Validators.min(1),
        (control: AbstractControl) => Validators.max(this.stock)(control),
      ],
    ],
  });

  constructor(
    private productoService: ProductosService,
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.admin = this.authService.admin;
    this.usuario = this.authService.usuario;
    console.log(this.usuario);
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

/*this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate(['/home/carrito']);
              });*/
