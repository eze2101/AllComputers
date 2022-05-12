import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/prodcuto.interface';
import { ProductosService } from '../../service/productos.service';
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
    console.log(producto);
    this.productoService.producto$.emit(producto);
    this.router.navigateByUrl(`/home/${producto._id}`);
  }
}
