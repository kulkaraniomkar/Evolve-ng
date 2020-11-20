import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MentorshipAdminRoutingModule } from './mentorship-admin-routing.module';
import { SharedModule } from 'src/app/shared.module';
import { EmuiModule } from 'src/app/components/emuicomponents/emui.module';

import { MatchCardModalComponent } from './match-card-modal/match-card-modal.component';
import { ManualMatchModalComponent } from './manual-match-modal/manual-match.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [MentorshipAdminRoutingModule.components, MatchCardModalComponent, ManualMatchModalComponent ],
  imports: [
    SharedModule,
    MentorshipAdminRoutingModule,
    FormsModule,
    EmuiModule
  ],
  entryComponents: [MatchCardModalComponent, ManualMatchModalComponent]
})
export class MentorshipAdminModule { }
