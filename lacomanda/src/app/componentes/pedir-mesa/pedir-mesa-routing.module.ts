import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedirMesaPage } from './pedir-mesa.page';

const routes: Routes = [
  {
    path: '',
    component: PedirMesaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedirMesaPageRoutingModule {}
