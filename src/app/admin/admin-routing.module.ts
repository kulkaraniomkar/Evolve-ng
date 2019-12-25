import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminSelectComponent } from './admin-select/admin-select.component';
import { AdminAutoMatchComponent } from './admin-auto-match/admin-auto-match.component';
import { AdminManageComponent } from './admin-manage/admin-manage.component';



const routes: Routes = [
  {  path: '', component: AdminManageComponent, data: { breadcrumb: 'Search '} },
  { path: 'matching', component: AdminComponent,  data: { breadcrumb: 'Mentee Matching'} },
  { path: 'view/:mentorid/:menteeid', component: AdminSelectComponent,  data: { breadcrumb: 'View mentor/mentee'} },
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
