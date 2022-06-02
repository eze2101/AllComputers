import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  Producto,
  Categoria,
} from '../../client/interfaces/prodcuto.interface';
import { ProductosService } from '../../client/service/productos.service';
import { AuthService } from '../../auth/services/auth.service.service';

@Component({
  selector: 'app-por-categoria',
  templateUrl: './por-categoria.component.html',
  styleUrls: ['./por-categoria.component.css'],
})
export class PorCategoriaComponent implements OnInit {
  productos: Producto[] = [];
  producto!: Producto;
  prodXcate: Producto[] = [];
  categoria!: Categoria;
  nombre!: string;
  admin: boolean = false;
  url!: string;

  constructor(
    private productoService: ProductosService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.admin = this.authService.admin;
    this.url = this.router.url;
  }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      this.nombre = params.get('name')!;
    });

    this.productoService.getCategorias().subscribe((categorias) => {
      categorias.map((categoria) => {
        if (categoria.name == this.nombre) {
          this.categoria = categoria;
        }
      });
    });

    this.productoService
      .getProductoXcategoria(this.nombre)
      .subscribe((productos) => {
        this.productos = productos;
      });
  }

  editar(name: string) {
    this.router.navigateByUrl(`/${this.url}/crear-editar-producto/${name}`);
  }
}
