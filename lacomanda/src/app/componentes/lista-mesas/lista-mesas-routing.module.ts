import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaMesasPage } from './lista-mesas.page';

const routes: Routes = [
  {
    path: '',
    component: ListaMesasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaMesasPageRoutingModule {}
