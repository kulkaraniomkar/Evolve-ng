import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminSelectComponent } from './admin-select/admin-select.component';
import { AdminAutoMatchComponent } from './admin-auto-match/admin-auto-match.component';



const routes: Routes = [
  { path: '', component: AdminComponent,  data: { breadcrumb: 'Admin'} },
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
    AdminAutoMatchComponent
  ]
 }
