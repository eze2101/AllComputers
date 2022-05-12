import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../interfaces/prodcuto.interface';
import { ProductosService } from '../../service/productos.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit {
  categorias!: Categoria[];
  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.productosService
      .getCaterogrias()
      .subscribe((categorias) => (this.categorias = categorias));
  }
}
