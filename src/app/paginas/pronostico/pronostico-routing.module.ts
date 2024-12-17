import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PronosticoPage } from './pronostico.page';

const routes: Routes = [
  {
    path: '',
    component: PronosticoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PronosticoPageRoutingModule {}
