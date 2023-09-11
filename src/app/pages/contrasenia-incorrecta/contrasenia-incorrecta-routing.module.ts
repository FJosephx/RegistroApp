import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContraseniaIncorrectaPage } from './contrasenia-incorrecta.page';

const routes: Routes = [
  {
    path: '',
    component: ContraseniaIncorrectaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContraseniaIncorrectaPageRoutingModule {}
