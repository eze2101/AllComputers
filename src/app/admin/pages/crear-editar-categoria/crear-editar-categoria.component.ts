import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { ProductosService } from 'src/app/client/service/productos.service';
import { AuthService } from '../../../auth/services/auth.service.service';
import { Categoria } from '../../../client/interfaces/prodcuto.interface';

@Component({
  selector: 'app-crear-editar-categoria',
  templateUrl: './crear-editar-categoria.component.html',
  styleUrls: ['./crear-editar-categoria.component.css'],
})
export class CrearEditarCategoriaComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    name: [null, [Validators.required, Validators.minLength(4)]],
    img: [null, [Validators.required]],
    file: [null],
  });
  id!: string;
  categoria!: Categoria;
  titulo: string = 'Crear Categoria';
  path!: string | null;
  image: any;
  file: any;

  constructor(
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private productoService: ProductosService,
    private authService: AuthService
  ) {
    this.path = this.activeRoute.snapshot.paramMap.get('name');
  }

  ngOnInit(): void {
    this.Editar();
  }

  CrearCategoria() {
    const { name, img } = this.miFormulario.value;

    const CATEGORIA: Categoria = {
      name: name,
      img: img.trim(),
    };

    this.productoService.crearCategoria(CATEGORIA).subscribe((ok) => {
      if (ok === true) {
        this.subir();
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
          (this.categoria = resp[0]),
            (this.id = this.categoria._id!),
            this.buscarImagen();
          this.miFormulario.setValue({
            name: resp[0].name,
            img: resp[0].img,
            file: null,
          });
        });
    }
  }
  buscarImagen() {
    this.productoService.getImagen(this.categoria.img).subscribe((resp) => {
      this.image = resp.fileUrl;
    });
  }

  editarCategoria() {
    const { name, img } = this.miFormulario.value;
    const CATEGORIAS: Categoria = {
      name: name,
      img: img,
    };

    this.productoService.editarCategoria(this.id!, CATEGORIAS).subscribe(
      (ok) => {
        if (ok.ok === true) {
          this.subir();

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
        this.productoService.eliminarCategoria(id).subscribe((resp) => {
          resp;
        });
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
    if (form.value.file) {
      this.productoService
        .uploadImagenes(form.value.img, this.file)
        .subscribe((data) => {
          this.miFormulario.reset;
        });
    } else {
      console.log('no entro');
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
}
