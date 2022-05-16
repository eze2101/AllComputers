import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ComponentsModule } from '../components/components.module';
import { HomeAdminComponent } from './pages/home/home.component';
import { HomeCategoriaComponent } from './pages/home/home-categoria/home-categoria.component';
import { CrearEditarCategoriaComponent } from './pages/crear-editar-categoria/crear-editar-categoria.component';
import { CrearEditarProductoComponent } from './pages/crear-editar-producto/crear-editar-producto.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    HomeAdminComponent,
    HomeCategoriaComponent,
    CrearEditarCategoriaComponent,
    CrearEditarProductoComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ComponentsModule,
  ],
})
export class AdminModule {}
