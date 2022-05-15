import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../../client/interfaces/prodcuto.interface';
import { ProductosService } from '../../client/service/productos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjeta-producto',
  templateUrl: './tarjeta-producto.component.html',
  styleUrls: ['./tarjeta-producto.component.css'],
})
export class TarjetaProductoComponent implements OnInit {
  @Input() producto!: Producto;

  constructor(
    private productoService: ProductosService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  verProducto(producto: Producto) {
    let url = this.router.url;
    this.router.navigateByUrl(`/${url}/${producto._id}`);
  }
}
