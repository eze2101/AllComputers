import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductosService } from 'src/app/client/service/productos.service';
import { Categoria } from '../../../client/interfaces/prodcuto.interface';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css'],
})
export class EditarCategoriaComponent implements OnInit {
  id!: any;
  categoria!: Categoria;
  miFormulario: FormGroup = this.fb.group({
    name: ``,
    img: ``,
  });

  constructor(
    private productoService: ProductosService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      console.log(this.id);

      this.productoService.getCategoriaID(this.id).subscribe((resp) => {
        console.log(resp), (this.categoria = resp);
      });

      console.log(this.categoria);

      this.miFormulario = this.fb.group({
        name: `${this.categoria.name}`,
        img: `${this.categoria.img}`,
      });
    });
  }

  cancelar() {}

  guardar() {}

  eliminar() {}
}
