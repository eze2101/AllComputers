import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { ProductosService } from '../../client/service/productos.service';
import { AuthService } from 'src/app/auth/services/auth.service.service';
import {
  Categoria,
  Producto,
} from '../../client/interfaces/prodcuto.interface';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css'],
})
export class BuscarComponent implements OnInit {
  termino: string = '';
  productos: Producto[] = [];
  categorias: Categoria[] = [];
  categoriasSugeridas: Categoria[] = [];
  url: string = 'home';

  constructor(
    private router: Router,
    private productoService: ProductosService,
    private authService: AuthService
  ) {
    if (this.authService.admin) {
      this.url = 'admin';
    }
  }

  ngOnInit(): void {
    this.productoService
      .getCategorias()
      .subscribe((categorias) => (this.categorias = categorias));
  }

  buscando() {
    this.productoService
      .getProductosSugeridos(this.termino.trim().toLowerCase())
      .subscribe((productos) => (this.productos = productos));
    this.productoService
      .getCategoriasSugeridas(this.termino.trim())
      .subscribe((cat) => (this.categoriasSugeridas = cat));
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    let categoria = this.categorias.filter(
      (res) => res.name.trim() == event.option.value.name.trim()
    );

    if (categoria.length == 1) {
      this.termino = categoria[0]!.name;
      this.router.navigateByUrl(`/${this.url}/${this.termino}`);
    } else {
      const producto: Producto = event.option.value;
      this.termino = producto.name;
      this.router.navigateByUrl(
        `/${this.url}/${producto.categoria}/${producto.name}`
      );
    }
  }
}
