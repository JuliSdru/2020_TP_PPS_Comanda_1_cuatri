import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaMesasPageRoutingModule } from './lista-mesas-routing.module';

import { ListaMesasPage } from './lista-mesas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaMesasPageRoutingModule
  ],
  declarations: [ListaMesasPage]
})
export class ListaMesasPageModule {}
