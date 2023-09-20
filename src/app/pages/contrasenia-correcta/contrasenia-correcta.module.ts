import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContraseniaCorrectaPageRoutingModule } from './contrasenia-correcta-routing.module';

import { ContraseniaCorrectaPage } from './contrasenia-correcta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContraseniaCorrectaPageRoutingModule
  ],
  declarations: [ContraseniaCorrectaPage]
})
export class ContraseniaCorrectaPageModule {}
