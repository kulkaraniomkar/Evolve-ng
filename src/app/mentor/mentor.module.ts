import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MentorRoutingModule } from './mentor-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [MentorRoutingModule.components],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    MentorRoutingModule
  ]
})
export class MentorModule { }
