import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OurTeamPageRoutingModule } from './our-team-routing.module';

import { OurTeamPage } from './our-team.page';
import { ComponentModuleModule } from 'src/app/modules/component-module/component-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModuleModule,
    OurTeamPageRoutingModule
  ],
  declarations: [OurTeamPage]
})
export class OurTeamPageModule {}
