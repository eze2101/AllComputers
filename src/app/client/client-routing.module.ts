import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ProductoComponent } from '../components/producto/producto.component';
import { CategoriasComponent } from '../components/categorias/categorias.component';
import { HomeComponent } from './pages/home/home.component';
import { ListadoComponent } from './pages/home/categorias/listado.component';
import { PorCategoriaComponent } from '../components/por-categoria/por-categoria.component';

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
export class ClientRoutingModule {}
