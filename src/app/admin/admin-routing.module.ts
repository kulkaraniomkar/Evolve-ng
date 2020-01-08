import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminSelectComponent } from './admin-select/admin-select.component';
import { AdminAutoMatchComponent } from './admin-auto-match/admin-auto-match.component';
import { AdminManageComponent } from './admin-manage/admin-manage.component';
import { AdminManualMatchComponent } from './admin-manual-match/admin-manual-match.component';



const routes: Routes = [
  {  path: '', component: AdminManageComponent, data: { breadcrumb: 'Search '} },
  { path: 'matching', component: AdminComponent,  data: { breadcrumb: 'Mentee Matching'} },
  { path: 'manual-matching/:menteeid/:fullname', component: AdminManualMatchComponent,  data: { breadcrumb: 'Manual Matching'} },
  { path: 'view/:mentorid/:menteeid/:matchtypeid', component: AdminSelectComponent,  data: { breadcrumb: 'View mentor/mentee', mode: 'create'} },
  { path: 'update/:mentorid/:menteeid/:activityid', component: AdminSelectComponent,  data: { breadcrumb: 'Update mentor/mentee', mode: 'update'} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
  static components = [
    AdminComponent,
    AdminSelectComponent,
    AdminAutoMatchComponent,
    AdminManageComponent
  ]
 }
