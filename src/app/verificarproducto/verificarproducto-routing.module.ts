import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerificarproductoPage } from './verificarproducto.page';

const routes: Routes = [
  {
    path: '',
    component: VerificarproductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificarproductoPageRoutingModule {}
