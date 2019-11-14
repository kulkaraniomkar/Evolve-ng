import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenteesRoutingModule } from './mentees-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { PresentationComponentsModule } from '../components/presentation-components.module';
import { MenteesListComponent } from './mentees-list/mentees-list.component';
import { MenteesSubcriptionsComponent } from './mentees-subcriptions/mentees-subcriptions.component';



@NgModule({
  declarations: [MenteesRoutingModule.components, MenteesListComponent, MenteesSubcriptionsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    MenteesRoutingModule,
    PresentationComponentsModule  
  ],
  entryComponents:[MenteesRoutingModule.components[2]]
})
export class MenteesModule { }
