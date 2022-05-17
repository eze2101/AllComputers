import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductosService } from 'src/app/client/service/productos.service';
import { Categoria } from '../../../client/interfaces/prodcuto.interface';
import { environment } from '../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-editar-categoria',
  templateUrl: './crear-editar-categoria.component.html',
  styleUrls: ['./crear-editar-categoria.component.css'],
})
export class CrearEditarCategoriaComponent implements OnInit {
  id!: string;
  categoria!: Categoria;
  miFormulario: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    file: ['', [Validators.required]],
    img: ['', [Validators.required]],
  });
  titulo: string = 'Crear Categoria';
  path!: string | null;
  private baseUrl = environment.baseUrl;
  image: any = '../assets/mazo.jpg';
  file: any;

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

  CrearCategoria() {
    const { name, img } = this.miFormulario.value;
    /*const typeImagen = this.miFormulario.value.file.substring(
      this.miFormulario.value.file.lastIndexOf('.') + 1
    );*/
    const CATEGORIA: Categoria = {
      name: name,
      img: img,
    };

    console.log(CATEGORIA);

    this.productoService.crearCategoria(CATEGORIA).subscribe((ok) => {
      if (ok === true) {
        Swal.fire({
          icon: 'success',
          title: 'Categoria creada',
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
      this.titulo = 'Editar Categoria';
      this.productoService
        .getCategoriasSugeridas(this.path!)
        .subscribe((resp) => {
          this.miFormulario.setValue({
            name: resp[0].name,
            img: resp[0].img,
          }),
            (this.categoria = resp[0]),
            (this.id = this.categoria._id!);
        });
    }
  }

  editarCategoria() {
    const { name, img } = this.miFormulario.value;
    const CATEGORIAS: Categoria = {
      name: name,
      img: img,
    };
    console.log(this.categoria);
    console.log(this.id);

    this.productoService
      .editarCategoria(this.id!, CATEGORIAS)
      .subscribe((ok) => {
        if (ok.ok === true) {
          Swal.fire({
            icon: 'success',
            title: `Categoria ${name} actualizada!`,
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
      title: `seguro de eliminar "${this.categoria.name}"`,
      text: 'No se puede revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.eliminarCategoria(id).subscribe((resp) => resp);
        Swal.fire({
          title: 'Eliminada!',
          text: 'Categoria eliminada correctamente.',
          icon: 'success',
          timer: 2000,
        });
      }
      this.router.navigateByUrl('/admin');
    });
  }

  subir() {
    const form = this.miFormulario;

    console.log(form.value.file);

    if (form.valid) {
      this.productoService
        .uploadImagenes(form.value.img, this.file)
        .subscribe((data) => {
          this.miFormulario.reset;
        });
      this.image = '../assets/mazo.jpg';
    }
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type.includes('image')) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function load(this: any) {
          this.image = reader.result;
        }.bind(this);

        this.file = file;
      } else {
        console.log('hubo un error');
      }
    }
  }
  /*
  getCategoriaID(id: string) {
    return new Promise((resolve, reject) => {
      this.http
        .get<Categoria>(`${this.baseUrl}/home/categoria/${id}`)
        .subscribe(
          (resp) => {
            this.categoria = resp;
            console.log(this.categoria);

            this.miFormulario = this.fb.group({
              name: `${this.categoria.name}`,
              img: `${this.categoria.img}`,
            });

            resolve(resp);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  cancelar() {
    this.router.navigateByUrl('/admin');
  }

  guardar() {
    /*const { name, img} = this.miFormulario.value;

    this.productoService.editarCategoria(name, img).subscribe((ok) => {
      console.log(ok);
      if (ok === true) {
        this.router.navigateByUrl('/admin');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: ok,
        });
      }
    });//
  }

  eliminar(id: string) {
    Swal.fire({
      title: `seguro de eliminar "${this.categoria.name}"`,
      text: 'No se puede revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.eliminarCategoria(id).subscribe((resp) => resp);
        Swal.fire({
          title: 'Eliminada!',
          text: 'Categoria eliminada correctamente.',
          icon: 'success',
          timer: 2000,
        });
      }
      this.router.navigateByUrl('/admin');
    });
  }*/
}
