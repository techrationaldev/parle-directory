import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbackPageRoutingModule } from './feedback-routing.module';

import { FeedbackPage } from './feedback.page';
import { ComponentModuleModule } from 'src/app/modules/component-module/component-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModuleModule,
    FeedbackPageRoutingModule
  ],
  declarations: [FeedbackPage]
})
export class FeedbackPageModule {}
