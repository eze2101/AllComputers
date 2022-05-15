import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { BuscarComponent } from './buscar/buscar.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { PorCategoriaComponent } from './por-categoria/por-categoria.component';
import { ProductoComponent } from './producto/producto.component';
import { TarjetaProductoComponent } from './tarjeta-producto/tarjeta-producto.component';

@NgModule({
  declarations: [
    MenuComponent,
    BuscarComponent,
    CategoriasComponent,
    PorCategoriaComponent,
    ProductoComponent,
    TarjetaProductoComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    RouterModule,
  ],
  exports: [
    MenuComponent,
    BuscarComponent,
    CategoriasComponent,
    PorCategoriaComponent,
    ProductoComponent,
    TarjetaProductoComponent,
  ],
})
export class ComponentsModule {}