import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RegistrarSupervisorPageRoutingModule } from './registrar-supervisor-routing.module';

import { RegistrarSupervisorPage } from './registrar-supervisor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegistrarSupervisorPageRoutingModule
  ],
  declarations: [RegistrarSupervisorPage]
})
export class RegistrarSupervisorPageModule {}
