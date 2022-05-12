import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../interfaces/prodcuto.interface';
import { ProductosService } from '../../service/productos.service';
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
      .getCaterogrias()
      .subscribe((categorias) => (this.categorias = categorias));
  }

  irA(nombre: string) {
    this.router.navigateByUrl(`/home/${nombre}`);
  }
}
