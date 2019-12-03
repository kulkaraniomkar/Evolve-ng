import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenteeSignupComponent } from './mentee-signup/mentee-signup.component';
import { MenteeSubscriptionsComponent } from './mentee-subscriptions/mentee-subscriptions.component';
import { MenteeSignupFormComponent } from './mentee-signup-form/mentee-signup-form.component';
import { MenteeComponent } from './mentee.component';


const routes: Routes = [
  { path: '', component: MenteeSubscriptionsComponent,  data: { breadcrumb: 'Subscriptions'} },
  { path: 'signup', component: MenteeSignupComponent,  data: { breadcrumb: 'Signup'} },
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
    MenteeComponent
  ]
 }
