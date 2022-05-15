import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductosService } from 'src/app/client/service/productos.service';
import { Categoria } from '../../../client/interfaces/prodcuto.interface';
import { environment } from '../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';

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
  private baseUrl = environment.baseUrl;

  constructor(
    private productoService: ProductosService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      console.log(this.id);

      this.getCategoriaID(this.id);

      console.log(this.categoria);
    });
  }

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

  cancelar() {}

  guardar() {}

  eliminar() {}
}
