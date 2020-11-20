import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MentorRoutingModule } from './mentor-routing.module';
import { SharedModule } from 'src/app/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmuiModule } from 'src/app/components/emuicomponents/emui.module';
import { MenteeModalComponent } from 'src/app/components/emuicomponents/mentee-modal/mentee-modal.component';
import { MentorModalComponent } from 'src/app/components/emuicomponents/mentor-modal/mentor-modal.component';


@NgModule({
  declarations: [MentorRoutingModule.components],
  imports: [
    SharedModule,
    MentorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EmuiModule
  ],
  entryComponents: []
})
export class MentorModule { }
