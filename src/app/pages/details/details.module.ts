import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsPageRoutingModule } from './details-routing.module';

import { DetailsPage } from './details.page';
import { WatchVideoComponent } from 'src/app/components/watch-video/watch-video.component';
import { ComponentModuleModule } from 'src/app/modules/component-module/component-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModuleModule,
    DetailsPageRoutingModule
  ],
  declarations: [DetailsPage, WatchVideoComponent]
})
export class DetailsPageModule {}
