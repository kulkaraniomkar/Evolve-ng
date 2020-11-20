import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { AvatarComponent } from './avatar/avatar.component';
import { DonutComponent } from './donut/donut.component';
import { ProgressCardComponent } from './progress-card/progress-card.component';
import { UserCardComponent } from './user-card/user-card.component';
import { ProfileHeadCardComponent } from './profile-head-card/profile-head-card.component';
import { MenteeModalComponent } from './mentee-modal/mentee-modal.component';
import { MentorModalComponent } from './mentor-modal/mentor-modal.component';
import { MentorMyModalComponent } from './mentor-my-modal/mentor-my-modal.component';

const COMPONENTS = [
  AvatarComponent,
  DonutComponent,
  ProgressCardComponent,
  UserCardComponent,
  ProfileHeadCardComponent,
  MenteeModalComponent,
  MentorModalComponent,
  MentorMyModalComponent
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    SharedModule, CommonModule
  ],
  exports: [...COMPONENTS],
  entryComponents: [MenteeModalComponent, MentorModalComponent, MentorMyModalComponent]
})
export class EmuiModule { }
