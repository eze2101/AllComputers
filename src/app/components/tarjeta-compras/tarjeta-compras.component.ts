import { Component, Input, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/client/service/productos.service';
import { Producto } from '../../client/interfaces/prodcuto.interface';

@Component({
  selector: 'app-tarjeta-compras',
  templateUrl: './tarjeta-compras.component.html',
  styleUrls: ['./tarjeta-compras.component.css'],
})
export class TarjetaComprasComponent implements OnInit {
  @Input() ID: any;
  producto!: Producto;
  ProductoMapa = {
    '=1': '1 producto',
    other: '# productos',
  };

  constructor(private productosServices: ProductosService) {}

  ngOnInit(): void {
    this.productosServices
      .getProductoID(this.ID.IDproducto)
      .subscribe((res) => {
        this.producto = res;
      });
  }
}
