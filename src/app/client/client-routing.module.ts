import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarritoComponent } from './pages/carrito/carrito.component';
import { CategoriasComponent } from '../components/categorias/categorias.component';
import { ComprasComponent } from './pages/compras/compras.component';
import { HomeCategoriaComponent } from './pages/home/home-categoria/home-categoria.component';
import { HomeComponent } from './pages/home/home.component';
import { PorCategoriaComponent } from '../components/por-categoria/por-categoria.component';
import { ProductoComponent } from '../components/producto/producto.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'carrito',
        component: CarritoComponent,
      },
      {
        path: 'compras',
        component: ComprasComponent,
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
            path: ':name',
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
