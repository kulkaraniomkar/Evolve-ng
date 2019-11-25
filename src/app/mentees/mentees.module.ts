import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenteesRoutingModule } from './mentees-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { PresentationComponentsModule } from '../components/presentation-components.module';



@NgModule({
  declarations: [MenteesRoutingModule.components],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    MenteesRoutingModule,
    PresentationComponentsModule  
  ]
})
export class MenteesModule { }
