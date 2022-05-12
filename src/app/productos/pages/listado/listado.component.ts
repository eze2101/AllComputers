import { Component, OnInit } from '@angular/core';

import { Producto } from '../../interfaces/prodcuto.interface';

import { ProductosService } from '../../service/productos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
})
export class ListadoComponent implements OnInit {
  productos: Producto[] = [];
  producto!: Producto;
  prodXcate: Producto[] = [];

  constructor(
    private productoService: ProductosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productoService.getProductos().subscribe((productos) => {
      this.productos = productos;
    });

    this.productoService.categoriaCompleta$.subscribe((pxc) => {
      (this.prodXcate = pxc), console.log(this.prodXcate);
    });
  }

  /*verProducto(producto: Producto) {
    console.log(producto);
    this.productoService.producto$.emit(producto);
  }*/
}
