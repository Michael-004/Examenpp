import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GanadorPage } from './ganador.page';

const routes: Routes = [
  {
    path: '',
    component: GanadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GanadorPageRoutingModule {}
