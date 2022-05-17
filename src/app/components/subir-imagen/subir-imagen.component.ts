import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProductosService } from '../../client/service/productos.service';

@Component({
  selector: 'app-subir-imagen',
  templateUrl: './subir-imagen.component.html',
  styleUrls: ['./subir-imagen.component.css'],
})
export class SubirImagenComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    name: [null, Validators.required],
    file: [null, Validators.required],
  });
  image: any = '../assets/mazo.jpg';
  file: any;

  constructor(
    private fb: FormBuilder,
    private productosService: ProductosService
  ) {}

  ngOnInit(): void {}

  subir() {
    const form = this.miFormulario;

    console.log(
      form.value.file.substring(form.value.file.lastIndexOf('.') + 1)
    );

    if (form.valid) {
      this.productosService
        .uploadImagenes(form.value.name, this.file)
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
}
