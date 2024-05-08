import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetworkConnectionComponent } from 'src/app/components/network-connection/network-connection.component';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [NetworkConnectionComponent],
  exports: [NetworkConnectionComponent],
  imports: [
    IonicModule,
    CommonModule
  ]
})
export class ComponentModuleModule { }
