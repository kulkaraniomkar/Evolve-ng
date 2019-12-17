import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { AdminAutoMatchComponent } from './admin-auto-match/admin-auto-match.component';


@NgModule({
  declarations: [AdminComponent, AdminListComponent, AdminAutoMatchComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
