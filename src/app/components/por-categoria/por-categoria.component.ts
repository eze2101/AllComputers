import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Producto } from '../../client/interfaces/prodcuto.interface';
import { ProductosService } from '../../client/service/productos.service';

@Component({
  selector: 'app-por-categoria',
  templateUrl: './por-categoria.component.html',
  styleUrls: ['./por-categoria.component.css'],
})
export class PorCategoriaComponent implements OnInit {
  productos: Producto[] = [];
  producto!: Producto;
  prodXcate: Producto[] = [];
  nombre!: any;

  constructor(
    private productoService: ProductosService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      this.nombre = params.get('name');
    });

    this.productoService
      .getProductoXcategoria(this.nombre)
      .subscribe((productos) => {
        this.productos = productos;
      });
  }
}
