import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenteeRoutingModule } from './mentee-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';


@NgModule({
  declarations: [MenteeRoutingModule.components, ConfirmationDialogComponent],
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
