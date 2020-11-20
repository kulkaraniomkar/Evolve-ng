import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmuiModule } from 'src/app/components/emuicomponents/emui.module';


@NgModule({
  declarations: [HomeRoutingModule.components],
  imports: [
    SharedModule,
    HomeRoutingModule,
    EmuiModule
  ]
})
export class HomeModule { }
