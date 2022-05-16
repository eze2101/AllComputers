import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PorCategoriaComponent } from '../components/por-categoria/por-categoria.component';
import { ProductoComponent } from '../components/producto/producto.component';
import { CategoriasComponent } from '../components/categorias/categorias.component';
import { HomeAdminComponent } from './pages/home/home.component';
import { HomeCategoriaComponent } from './pages/home/home-categoria/home-categoria.component';
import { CrearEditarCategoriaComponent } from './pages/crear-editar-categoria/crear-editar-categoria.component';
import { EditarProductoComponent } from './pages/editar-producto/editar-producto.component';

const routes: Routes = [
  {
    path: '',
    component: HomeAdminComponent,
    children: [
      {
        path: 'crear-editar-categoria/:name',
        component: CrearEditarCategoriaComponent,
      },
      {
        path: 'editar-producto/:name',
        component: EditarProductoComponent,
      },
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
