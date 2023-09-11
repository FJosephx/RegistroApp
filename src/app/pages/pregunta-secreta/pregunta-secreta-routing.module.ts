import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreguntaSecretaPage } from './pregunta-secreta.page';

const routes: Routes = [
  {
    path: '',
    component: PreguntaSecretaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreguntaSecretaPageRoutingModule {}
