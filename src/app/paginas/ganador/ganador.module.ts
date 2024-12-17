import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GanadorPageRoutingModule } from './ganador-routing.module';

import { GanadorPage } from './ganador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GanadorPageRoutingModule
  ],
  declarations: [GanadorPage]
})
export class GanadorPageModule {}
