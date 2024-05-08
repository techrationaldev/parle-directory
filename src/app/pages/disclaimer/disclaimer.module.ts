import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisclaimerPageRoutingModule } from './disclaimer-routing.module';

import { DisclaimerPage } from './disclaimer.page';
import { ComponentModuleModule } from 'src/app/modules/component-module/component-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModuleModule,
    DisclaimerPageRoutingModule
  ],
  declarations: [DisclaimerPage]
})
export class DisclaimerPageModule {}
