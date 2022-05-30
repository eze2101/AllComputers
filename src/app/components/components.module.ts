import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { BuscarComponent } from './buscar/buscar.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { PorCategoriaComponent } from './por-categoria/por-categoria.component';
import { ProductoComponent } from './producto/producto.component';
import { TarjetaProductoComponent } from './tarjeta-producto/tarjeta-producto.component';
import { SubirImagenComponent } from './subir-imagen/subir-imagen.component';
import { TarjetaCategoriaComponent } from './tarjeta-categoria/tarjeta-categoria.component';
import { TarjetaCarritoComponent } from './tarjeta-carrito/tarjeta-carrito.component';
import { TarjetaComprasComponent } from './tarjeta-compras/tarjeta-compras.component';

@NgModule({
  declarations: [
    MenuComponent,
    BuscarComponent,
    CategoriasComponent,
    PorCategoriaComponent,
    ProductoComponent,
    TarjetaProductoComponent,
    SubirImagenComponent,
    TarjetaCategoriaComponent,
    TarjetaCarritoComponent,
    TarjetaComprasComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
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
    SubirImagenComponent,
    TarjetaCategoriaComponent,
    TarjetaCarritoComponent,
    TarjetaComprasComponent,
  ],
})
export class ComponentsModule {}
