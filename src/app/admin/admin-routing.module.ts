import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAdminComponent } from './home/home.component';
import { HomeCategoriaComponent } from './home/home-categoria/home-categoria.component';
import { PorCategoriaComponent } from '../components/por-categoria/por-categoria.component';
import { ProductoComponent } from '../components/producto/producto.component';
import { CategoriasComponent } from '../components/categorias/categorias.component';

const routes: Routes = [
  {
    path: '',
    component: HomeAdminComponent,
    children: [
      {
        path: ':name',
        component: HomeCategoriaComponent,
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
export class AdminRoutingModule {}
