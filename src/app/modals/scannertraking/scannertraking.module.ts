import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScannertrakingPageRoutingModule } from './scannertraking-routing.module';

import { ScannertrakingPage } from './scannertraking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScannertrakingPageRoutingModule
  ],
  declarations: [ScannertrakingPage]
})
export class ScannertrakingPageModule {}
