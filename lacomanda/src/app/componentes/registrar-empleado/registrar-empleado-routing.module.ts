import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarEmpleadoPage } from './registrar-empleado.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarEmpleadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarEmpleadoPageRoutingModule {}
