import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import {
  Categoria,
  Producto,
} from '../../client/interfaces/prodcuto.interface';
import { ProductosService } from '../../client/service/productos.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service.service';

type categorias =
  | 'teclados'
  | 'mouses'
  | 'monitores'
  | 'placas de video'
  | 'almacenamientos';

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
  user = this.authService.usuario;
  constructor(
    private productoService: ProductosService,
    private router: Router,
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

    console.log(this.router.url);

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
