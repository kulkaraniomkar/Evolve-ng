import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MentorsRoutingModule } from './mentors-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [MentorsRoutingModule.components],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    MentorsRoutingModule
  ]
})
export class MentorsModule { }
