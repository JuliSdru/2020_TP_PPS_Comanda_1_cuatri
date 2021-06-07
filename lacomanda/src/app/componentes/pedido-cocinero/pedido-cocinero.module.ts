import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidoCocineroPageRoutingModule } from './pedido-cocinero-routing.module';

import { PedidoCocineroPage } from './pedido-cocinero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoCocineroPageRoutingModule
  ],
  declarations: [PedidoCocineroPage]
})
export class PedidoCocineroPageModule {}
