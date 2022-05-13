import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Producto } from '../../interfaces/prodcuto.interface';
import { ProductosService } from '../../service/productos.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit {
  producto!: Producto;
  id!: any;

  constructor(
    private productoService: ProductosService,
    private activeRoute: ActivatedRoute
  ) {
    // this.productoService.producto$.subscribe(
    //   (producto) => (this.producto = producto));
  }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });
    console.log(this.id);

    this.productoService.getProductoID(this.id).subscribe((producto) => {
      this.producto = producto;
    });
  }
  // TODO: asdasd

  // GetProducto(prod: Producto) {
  //   (this.producto = prod), console.log(this.producto);
  // }
}
