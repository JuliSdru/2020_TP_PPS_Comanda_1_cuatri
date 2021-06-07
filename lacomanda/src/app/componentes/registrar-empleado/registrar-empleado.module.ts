import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RegistrarEmpleadoPageRoutingModule } from './registrar-empleado-routing.module';

import { RegistrarEmpleadoPage } from './registrar-empleado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegistrarEmpleadoPageRoutingModule
  ],
  declarations: [RegistrarEmpleadoPage]
})
export class RegistrarEmpleadoPageModule {}
