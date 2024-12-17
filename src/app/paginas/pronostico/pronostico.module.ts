import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PronosticoPageRoutingModule } from './pronostico-routing.module';

import { PronosticoPage } from './pronostico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PronosticoPageRoutingModule
  ],
  declarations: [PronosticoPage]
})
export class PronosticoPageModule {}
