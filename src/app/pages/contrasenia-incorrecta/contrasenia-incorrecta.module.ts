import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContraseniaIncorrectaPageRoutingModule } from './contrasenia-incorrecta-routing.module';

import { ContraseniaIncorrectaPage } from './contrasenia-incorrecta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContraseniaIncorrectaPageRoutingModule
  ],
  declarations: [ContraseniaIncorrectaPage]
})
export class ContraseniaIncorrectaPageModule {}
