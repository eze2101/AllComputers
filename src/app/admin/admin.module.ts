import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ComponentsModule } from '../components/components.module';
import { HomeAdminComponent } from './home/home.component';
import { HomeCategoriaComponent } from './home/home-categoria/home-categoria.component';

@NgModule({
  declarations: [HomeAdminComponent, HomeCategoriaComponent],
  imports: [CommonModule, AdminRoutingModule, ComponentsModule],
})
export class AdminModule {}
