import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MenuModule } from '../menu/menu.module';
import { HomeAdminComponent } from './home/home.component';

@NgModule({
  declarations: [HomeAdminComponent],
  imports: [CommonModule, AdminRoutingModule, MenuModule],
})
export class AdminModule {}
