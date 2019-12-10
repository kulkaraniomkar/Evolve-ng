import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MentorComponent } from './mentor.component';


const routes: Routes = [
   { path: '', component: MentorComponent,  data: { breadcrumb: 'Subscriptions'} },
  // { path: 'signup/:id', component: MenteeCrudComponent,  data: { breadcrumb: 'Signup mentee', mode: 'New Mentee Signup'} },
  // { path: 'edit/:id', component: MenteeCrudComponent,  data: { breadcrumb: 'Edit', mode: 'Edit Mentee'} }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MentorRoutingModule {
  static components = [
    MentorComponent
  ];
 }
