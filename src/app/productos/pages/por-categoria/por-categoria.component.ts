import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Producto } from '../../interfaces/prodcuto.interface';
import { ProductosService } from '../../service/productos.service';

@Component({
  selector: 'app-por-categoria',
  templateUrl: './por-categoria.component.html',
  styleUrls: ['./por-categoria.component.css'],
})
export class PorCategoriaComponent implements OnInit {
  productos: Producto[] = [];
  producto!: Producto;
  prodXcate: Producto[] = [];
  nombre!: string;

  constructor(
    private productoService: ProductosService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log('hola');
    this.activeRoute.params.subscribe((params: Params) => {
      this.nombre = params['name'];
    });
    console.log(this.nombre);

    // this.productoService.getProductos().subscribe((productos) => {
    //   this.productos = productos;
    // });
    this.productoService
      .getProductoXcategoria(this.nombre)
      .subscribe((productos) => {
        this.productos = productos;
      });

    // this.productoService.categoriaCompleta$.subscribe((pxc) => {
    //   (this.prodXcate = pxc), console.log(this.prodXcate);
    // });

    console.log(this.router.url);
  }
}
