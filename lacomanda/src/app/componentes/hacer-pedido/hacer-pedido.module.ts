import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HacerPedidoPageRoutingModule } from './hacer-pedido-routing.module';

import { HacerPedidoPage } from './hacer-pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HacerPedidoPageRoutingModule
  ],
  declarations: [HacerPedidoPage]
})
export class HacerPedidoPageModule {}
