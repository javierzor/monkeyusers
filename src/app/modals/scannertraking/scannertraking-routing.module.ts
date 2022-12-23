import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScannertrakingPage } from './scannertraking.page';

const routes: Routes = [
  {
    path: '',
    component: ScannertrakingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScannertrakingPageRoutingModule {}
