import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CanjearPageRoutingModule } from './canjear-routing.module';

import { CanjearPage } from './canjear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CanjearPageRoutingModule
  ],
  declarations: [CanjearPage]
})
export class CanjearPageModule {}
