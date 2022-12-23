import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificarproductoPageRoutingModule } from './verificarproducto-routing.module';

import { VerificarproductoPage } from './verificarproducto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificarproductoPageRoutingModule
  ],
  declarations: [VerificarproductoPage]
})
export class VerificarproductoPageModule {}
