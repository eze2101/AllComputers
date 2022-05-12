import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/prodcuto.interface';
import { ProductosService } from '../../service/productos.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit {
  producto!: Producto;

  constructor(private productoService: ProductosService) {
    this.productoService.producto$.subscribe(
      (producto) => (this.producto = producto)
    );
  }

  ngOnInit() {}

  GetProducto(prod: Producto) {
    (this.producto = prod), console.log(this.producto);
  }
}
