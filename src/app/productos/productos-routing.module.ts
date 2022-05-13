import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ProductoComponent } from './pages/producto/producto.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { HomeComponent } from './pages/home/home.component';
import { ListadoComponent } from './pages/home/categorias/listado.component';
import { PorCategoriaComponent } from './pages/por-categoria/por-categoria.component';
import { HomeAdminComponent } from '../admin/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: ':name',
        component: ListadoComponent,
        children: [
          {
            path: '',
            component: PorCategoriaComponent,
          },
          {
            path: ':id',
            component: ProductoComponent,
          },
        ],
      },
      {
        path: '',
        component: CategoriasComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductosRoutingModule {}
