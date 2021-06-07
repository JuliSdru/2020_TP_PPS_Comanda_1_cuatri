import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaProductosPage } from './lista-productos.page';

const routes: Routes = [
  {
    path: '',
    component: ListaProductosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaProductosPageRoutingModule {}
