import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ComponentsModule } from '../components/components.module';
import { HomeAdminComponent } from './pages/home/home.component';
import { HomeCategoriaComponent } from './pages/home/home-categoria/home-categoria.component';
import { EditarCategoriaComponent } from './pages/editar-categoria/editar-categoria.component';
import { EditarProductoComponent } from './pages/editar-producto/editar-producto.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    HomeAdminComponent,
    HomeCategoriaComponent,
    EditarCategoriaComponent,
    EditarProductoComponent,
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
