import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidoBartenderPageRoutingModule } from './pedido-bartender-routing.module';

import { PedidoBartenderPage } from './pedido-bartender.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoBartenderPageRoutingModule
  ],
  declarations: [PedidoBartenderPage]
})
export class PedidoBartenderPageModule {}
