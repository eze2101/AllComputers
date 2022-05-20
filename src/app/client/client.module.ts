import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { HomeCategoriaComponent } from './pages/home/home-categoria/listado.component';
import { ClientRoutingModule } from './client-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { CarritoComponent } from './pages/carrito/carrito.component';

@NgModule({
  declarations: [HomeCategoriaComponent, HomeComponent, CarritoComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
})
export class ClientModule {}
