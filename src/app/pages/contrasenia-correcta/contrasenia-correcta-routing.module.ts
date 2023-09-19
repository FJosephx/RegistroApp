import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContraseniaCorrectaPage } from './contrasenia-correcta.page';

const routes: Routes = [
  {
    path: '',
    component: ContraseniaCorrectaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContraseniaCorrectaPageRoutingModule {}
