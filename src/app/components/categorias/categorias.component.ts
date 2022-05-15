import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../client/interfaces/prodcuto.interface';
import { ProductosService } from '../../client/service/productos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit {
  categorias!: Categoria[];
  constructor(
    private productosService: ProductosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('cargado');
    this.productosService
      .getCategorias()
      .subscribe((categorias) => (this.categorias = categorias));
  }

  irA(nombre: string) {
    let url = this.router.url;
    this.router.navigateByUrl(`/${url}/${nombre.trim()}`);
  }
}
