import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenteeRoutingModule } from './mentee-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';

import { MenteeCrudComponent } from './mentee-crud/mentee-crud.component';
import { MenteeEditComponent } from './mentee-edit/mentee-edit.component';


@NgModule({
  declarations: [MenteeRoutingModule.components, ConfirmationDialogComponent, MenteeEditComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    MenteeRoutingModule
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ]
})
export class MenteeModule { }
