import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { SubscribeComponent } from 'src/app/components/subscribe/subscribe.component';
import { ComponentModuleModule } from 'src/app/modules/component-module/component-module.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModuleModule,
    HomePageRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [HomePage, SubscribeComponent,]
})
export class HomePageModule {}
