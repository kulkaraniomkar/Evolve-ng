import { NgModule } from '@angular/core';

import { MenteeRoutingModule } from './mentee-routing.module';
import { SharedModule } from 'src/app/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmuiModule } from 'src/app/components/emuicomponents/emui.module';


@NgModule({
  declarations: [MenteeRoutingModule.components],
  imports: [
    SharedModule,
    MenteeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EmuiModule
  ]
})
export class MenteeModule { }
