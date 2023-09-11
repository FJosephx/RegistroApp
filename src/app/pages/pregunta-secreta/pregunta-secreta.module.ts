import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreguntaSecretaPageRoutingModule } from './pregunta-secreta-routing.module';

import { PreguntaSecretaPage } from './pregunta-secreta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreguntaSecretaPageRoutingModule
  ],
  declarations: [PreguntaSecretaPage]
})
export class PreguntaSecretaPageModule {}
