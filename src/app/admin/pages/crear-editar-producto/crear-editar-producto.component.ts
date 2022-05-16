import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from 'src/app/client/service/productos.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Producto } from '../../../client/interfaces/prodcuto.interface';

@Component({
  selector: 'app-crear-editar-producto',
  templateUrl: './crear-editar-producto.component.html',
  styleUrls: ['./crear-editar-producto.component.css'],
})
export class CrearEditarProductoComponent implements OnInit {
  id!: string;
  producto!: Producto;
  miFormulario: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    price: ['', [Validators.required]],
    stock: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(4)]],
    categoria: ['', [Validators.required, Validators.minLength(4)]],
    img: ['', [Validators.required]],
  });
  titulo: string = 'Crear Producto';
  path!: string | null;
  private baseUrl = environment.baseUrl;

  constructor(
    private productoService: ProductosService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.path = this.activeRoute.snapshot.paramMap.get('name');
    console.log(this.path);

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit(): void {
    this.Editar();
  }

  CrearProducto() {
    const { name, price, stock, description, categoria, img } =
      this.miFormulario.value;
    const PRODUCTO: Producto = {
      name: name,
      price: price,
      stock: stock,
      description: description,
      categoria: categoria,
      img: img,
    };

    this.productoService.crearProducto(PRODUCTO).subscribe((ok) => {
      if (ok === true) {
        Swal.fire({
          icon: 'success',
          title: 'Producto creado',
          timer: 1500,
        });
        this.router.navigateByUrl('/admin');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: ok,
        });
      }
    });
  }

  esEditar() {
    if (this.path !== 'new') {
      return true;
    }
    return false;
  }

  Editar() {
    if (this.esEditar()) {
      this.titulo = 'Editar Producto';
      this.productoService
        .getProductosSugeridos(this.path!)
        .subscribe((resp) => {
          this.miFormulario.setValue({
            name: resp[0].name,
            price: resp[0].price,
            stock: resp[0].stock,
            description: resp[0].description,
            categoria: resp[0].categoria,
            img: resp[0].img,
          }),
            (this.producto = resp[0]),
            (this.id = this.producto._id!);
        });
    }
  }

  editarProducto() {
    const { name, price, stock, description, categoria, img } =
      this.miFormulario.value;
    const PRODUCTO: Producto = {
      name: name,
      price: price,
      stock: stock,
      description: description,
      categoria: categoria,
      img: img,
    };
    console.log(this.producto);
    console.log(this.id);

    this.productoService.editarProducto(this.id!, PRODUCTO).subscribe((ok) => {
      if (ok.ok === true) {
        Swal.fire({
          icon: 'success',
          title: `Producto ${name} actualizado!`,
          timer: 1500,
        });
        this.router.navigateByUrl('/admin');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: ok.msg,
        });
      }
    });
  }

  cancelar() {
    this.router.navigateByUrl('/admin');
  }

  eliminar(id: string) {
    Swal.fire({
      title: `seguro de eliminar "${this.producto.name}"`,
      text: 'No se puede revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.eliminarProducto(id).subscribe((resp) => resp);
        Swal.fire({
          title: 'Eliminada!',
          text: 'Producto eliminado correctamente.',
          icon: 'success',
          timer: 2000,
        });
      }
      this.router.navigateByUrl('/admin');
    });
  }
}
