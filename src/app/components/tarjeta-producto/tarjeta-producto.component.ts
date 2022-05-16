import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../../client/interfaces/prodcuto.interface';
import { ProductosService } from '../../client/service/productos.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service.service';

@Component({
  selector: 'app-tarjeta-producto',
  templateUrl: './tarjeta-producto.component.html',
  styleUrls: ['./tarjeta-producto.component.css'],
})
export class TarjetaProductoComponent implements OnInit {
  @Input() producto!: Producto;
  admin: boolean = false;
  url: string = this.router.url;

  constructor(
    private productoService: ProductosService,
    private router: Router,
    private authService: AuthService
  ) {
    this.admin = this.authService.admin;
  }

  ngOnInit(): void {}

  verProducto(producto: Producto) {
    this.router.navigateByUrl(`/${this.url}/${producto.name}`);
  }

  editar(name: string) {
    this.router.navigateByUrl(`/admin/crear-editar-producto/${name}`);
  }
}
