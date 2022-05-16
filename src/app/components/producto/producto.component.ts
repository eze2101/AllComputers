import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Producto } from '../../client/interfaces/prodcuto.interface';
import { ProductosService } from '../../client/service/productos.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit {
  producto!: Producto;
  id!: string;
  path!: string;

  constructor(
    private productoService: ProductosService,
    private activeRoute: ActivatedRoute
  ) {
    // this.productoService.producto$.subscribe(
    //   (producto) => (this.producto = producto));
  }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      this.path = params.get('name')!;
    });

    this.productoService.getProductosSugeridos(this.path!).subscribe((resp) => {
      (this.producto = resp[0]), (this.id = this.producto._id!);
    });

    // this.productoService.getProductoID(this.id).subscribe((producto) => {
    //   this.producto = producto;
    // });
  }
  // TODO: asdasd

  // GetProducto(prod: Producto) {
  //   (this.producto = prod), console.log(this.producto);
  // }
}
