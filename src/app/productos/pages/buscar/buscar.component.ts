import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Categoria, Producto } from '../../interfaces/prodcuto.interface';
import { ProductosService } from '../../service/productos.service';
import { Router } from '@angular/router';

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
  categoriass: string =
    'teclados , mouses, monitores,placas de video,almacenamientos ';

  //productoSeleccionado!: Producto;

  constructor(
    private productoService: ProductosService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  buscando() {
    this.productoService
      .getProductosSugeridos(this.termino.trim().toLowerCase())
      .subscribe((productos) => (this.productos = productos));
    this.productoService
      .getCategoriasSugeridas(this.termino.trim())
      .subscribe((cat) => (this.categorias = cat));
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    if (this.categoriass.includes(event.option.value.name.trim())) {
      const categoria = event.option.value.name;
      this.termino = categoria;
      console.log(categoria);

      this.router.navigateByUrl(`/home/${categoria}`);
    } else {
      const producto: Producto = event.option.value;
      this.termino = producto.name;

      // this.productoService
      //   .getProductoID(producto._id)
      //   .subscribe((prod) => this.productoService.producto$.emit(prod));
      this.router.navigateByUrl(`/home/${producto._id}`);
    }
  }
}
