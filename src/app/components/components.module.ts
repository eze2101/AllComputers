import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material/material.module';

import { BuscarComponent } from './buscar/buscar.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { MenuComponent } from './menu/menu.component';
import { PorCategoriaComponent } from './por-categoria/por-categoria.component';
import { ProductoComponent } from './producto/producto.component';
import { TarjetaCarritoComponent } from './tarjeta-carrito/tarjeta-carrito.component';
import { TarjetaCategoriaComponent } from './tarjeta-categoria/tarjeta-categoria.component';
import { TarjetaComprasComponent } from './tarjeta-compras/tarjeta-compras.component';
import { TarjetaProductoComponent } from './tarjeta-producto/tarjeta-producto.component';

@NgModule({
  declarations: [
    BuscarComponent,
    CategoriasComponent,
    MenuComponent,
    PorCategoriaComponent,
    ProductoComponent,
    TarjetaCarritoComponent,
    TarjetaCategoriaComponent,
    TarjetaComprasComponent,
    TarjetaProductoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
  ],
  exports: [
    BuscarComponent,
    CategoriasComponent,
    MenuComponent,
    PorCategoriaComponent,
    ProductoComponent,
    TarjetaCarritoComponent,
    TarjetaCategoriaComponent,
    TarjetaComprasComponent,
    TarjetaProductoComponent,
  ],
})
export class ComponentsModule {}
