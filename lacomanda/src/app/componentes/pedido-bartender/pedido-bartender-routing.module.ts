import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoBartenderPage } from './pedido-bartender.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoBartenderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoBartenderPageRoutingModule {}
