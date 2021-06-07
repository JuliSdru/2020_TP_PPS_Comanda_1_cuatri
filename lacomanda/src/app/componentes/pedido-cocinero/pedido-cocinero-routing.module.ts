import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoCocineroPage } from './pedido-cocinero.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoCocineroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoCocineroPageRoutingModule {}
