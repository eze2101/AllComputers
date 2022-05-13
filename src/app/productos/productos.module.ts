import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../material/material.module';

import { InputProductoComponent } from './components/input-producto/input-producto.component';
import { ListadoComponent } from './pages/home/categorias/listado.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { PorCategoriaComponent } from './pages/por-categoria/por-categoria.component';
import { ProductosRoutingModule } from './productos-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from '../menu/menu.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { FormsModule } from '@angular/forms';
import { TarjetaProductoComponent } from './components/tarjeta-producto/tarjeta-producto.component';

@NgModule({
  declarations: [
    InputProductoComponent,
    ListadoComponent,
    ProductoComponent,
    CategoriasComponent,
    PorCategoriaComponent,
    HomeComponent,
    MenuComponent,
    BuscarComponent,
    TarjetaProductoComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ProductosRoutingModule,
    FormsModule,
    FlexLayoutModule,
  ],
})
export class ProductosModule {}
