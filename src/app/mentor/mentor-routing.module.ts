import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MentorComponent } from './mentor.component';
import { MentorEditComponent } from './mentor-edit/mentor-edit.component';


const routes: Routes = [
   { path: '', component: MentorComponent,  data: { breadcrumb: 'Subscriptions'} },
   { path: 'signup/:id', component: MentorEditComponent,  data: { breadcrumb: 'Signup mentor', mode: 'New Mentor Signup'} },
  // { path: 'edit/:id', component: MenteeCrudComponent,  data: { breadcrumb: 'Edit', mode: 'Edit Mentee'} }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MentorRoutingModule {
  static components = [
    MentorComponent,
    MentorEditComponent
  ];
 }
