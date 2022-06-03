import { Component, Input, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/client/service/productos.service';
import { Producto } from '../../client/interfaces/prodcuto.interface';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

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
  url: string = environment.baseUrl + '/home';

  constructor(
    private productosServices: ProductosService,
    private router: Router
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
}
