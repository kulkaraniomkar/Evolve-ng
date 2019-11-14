import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { MentorsRoutingModule } from './mentors-routing.module';
import { PresentationComponentsModule } from '../components/presentation-components.module';



@NgModule({
  declarations: [MentorsRoutingModule.components],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    MentorsRoutingModule,
    PresentationComponentsModule
  ]
})
export class MentorsModule { }
