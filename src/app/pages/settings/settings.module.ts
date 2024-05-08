import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
import { SupportComponent } from 'src/app/components/support/support.component';
import { ComponentModuleModule } from 'src/app/modules/component-module/component-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModuleModule,
    SettingsPageRoutingModule
  ],
  declarations: [SettingsPage, SupportComponent]
})
export class SettingsPageModule {}
