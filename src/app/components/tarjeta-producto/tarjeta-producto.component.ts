import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/services/auth.service.service';
import { Producto } from '../../client/interfaces/prodcuto.interface';

import { ProductosService } from '../../client/service/productos.service';

@Component({
  selector: 'app-tarjeta-producto',
  templateUrl: './tarjeta-producto.component.html',
  styleUrls: ['./tarjeta-producto.component.css'],
})
export class TarjetaProductoComponent implements OnInit {
  @Input() producto!: Producto;
  admin: boolean = false;
  url: string = this.router.url;
  img!: any;

  constructor(
    private productoService: ProductosService,
    private router: Router,
    private authService: AuthService
  ) {
    this.admin = this.authService.admin;
  }

  ngOnInit(): void {
    this.buscarImagen();
  }

  verProducto(producto: Producto) {
    this.router.navigateByUrl(`/${this.url}/${producto.name}`);
  }

  editar(name: string) {
    this.router.navigateByUrl(`/admin/crear-editar-producto/${name}`);
  }

  buscarImagen() {
    this.productoService.getImagen(this.producto.img).subscribe((resp) => {
      this.img = resp;
    });
  }
}
