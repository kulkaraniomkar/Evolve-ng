import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenteeSignupComponent } from './mentee-signup/mentee-signup.component';
import { MenteeSubscriptionsComponent } from './mentee-subscriptions/mentee-subscriptions.component';
import { MenteeSignupFormComponent } from './mentee-signup-form/mentee-signup-form.component';
import { MenteeComponent } from './mentee.component';
import { MenteeCrudComponent } from './mentee-crud/mentee-crud.component';
import { MenteeEditComponent } from './mentee-edit/mentee-edit.component';


const routes: Routes = [
  { path: '', component: MenteeComponent,  data: { breadcrumb: 'Subscriptions'} },
  { path: 'signup/:id', component: MenteeEditComponent,  data: { breadcrumb: 'Signup', mode: 'New Mentee Signup'} },
  { path: 'edit/:id', component: MenteeEditComponent,  data: { breadcrumb: 'Signup', mode: 'Edit Mentee'} },
  { path: 'signup2/:id', component: MenteeCrudComponent,  data: { breadcrumb: 'Signup mentee', mode: 'New Mentee Signup'} },
  { path: 'edit2/:id', component: MenteeCrudComponent,  data: { breadcrumb: 'Edit', mode: 'Edit Mentee'} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenteeRoutingModule {
  static components = [
    MenteeSignupComponent,
    MenteeSubscriptionsComponent,
    MenteeSignupFormComponent,
    MenteeComponent,
    MenteeEditComponent,
    MenteeCrudComponent
  ]
 }
