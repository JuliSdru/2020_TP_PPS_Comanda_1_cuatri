import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HacerPedidoPage } from './hacer-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: HacerPedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HacerPedidoPageRoutingModule {}
