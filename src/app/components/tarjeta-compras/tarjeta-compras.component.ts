import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
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
  //para el pipe i18nPlural
  ProductoMapa = {
    '=1': '1 producto',
    other: '# productos',
  };
  url: string = environment.baseUrl + '/home';

  constructor(
    private router: Router,
    private productosServices: ProductosService
  ) {}

  ngOnInit(): void {
    this.productosServices
      .getProductoID(this.ID.IDproducto)
      .subscribe((res) => {
        this.producto = res;
      });
  }
  verProducto() {
    this.router.navigateByUrl(
      `home/${this.producto.categoria}/${this.producto.name}`
    );
  }

  otraPestana() {
    window.open(
      `http://localhost:4200/home/${this.producto.categoria}/${this.producto.name}`,
      '_blank'
    );
  }
}
