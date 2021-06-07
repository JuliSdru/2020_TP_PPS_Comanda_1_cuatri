import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarSupervisorPage } from './registrar-supervisor.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarSupervisorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarSupervisorPageRoutingModule {}
