import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
// import { AdminComponent } from './admin.component';
// import { AdminListComponent } from './admin-list/admin-list.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
// import { AdminAutoMatchComponent } from './admin-auto-match/admin-auto-match.component';
// import { AdminSelectComponent } from './admin-select/admin-select.component';
import { MentorInfoComponent } from './mentor-info/mentor-info.component';
import { AdminManageComponent } from './admin-manage/admin-manage.component';

@NgModule({
  declarations: [AdminRoutingModule.components, MentorInfoComponent, AdminManageComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    AdminRoutingModule
  ],
  entryComponents: [
    MentorInfoComponent
  ]
})
export class AdminModule { }
