import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../material/material.module';
import { ClientRoutingModule } from './client-routing.module';

import { CarritoComponent } from './pages/carrito/carrito.component';
import { ComponentsModule } from '../components/components.module';
import { ComprasComponent } from './pages/compras/compras.component';
import { HomeCategoriaComponent } from './pages/home/home-categoria/home-categoria.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    ComprasComponent,
    CarritoComponent,
    HomeCategoriaComponent,
    HomeComponent,
  ],
  imports: [
    ClientRoutingModule,
    CommonModule,
    ComponentsModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class ClientModule {}
