import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AdminRoutingModule } from './admin-routing.module';
import { ComponentsModule } from '../components/components.module';
import { CrearEditarCategoriaComponent } from './pages/crear-editar-categoria/crear-editar-categoria.component';
import { CrearEditarProductoComponent } from './pages/crear-editar-producto/crear-editar-producto.component';
import { HomeAdminComponent } from './pages/home/home.component';
import { HomeCategoriaComponent } from './pages/home/home-categoria/home-categoria.component';

@NgModule({
  declarations: [
    CrearEditarCategoriaComponent,
    CrearEditarProductoComponent,
    HomeAdminComponent,
    HomeCategoriaComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ComponentsModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
})
export class AdminModule {}
