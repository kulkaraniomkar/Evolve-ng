import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenteeSignupComponent } from './mentee-signup/mentee-signup.component';
import { MenteeSubscriptionsComponent } from './mentee-subscriptions/mentee-subscriptions.component';


const routes: Routes = [
  {
    path: 'signup',
    component: MenteeSignupComponent,
    data: { title: 'Mentor Signup' },
  },
  {
    path: 'my-subscriptions',
    component: MenteeSubscriptionsComponent,
    data: { title: 'Subscriptions' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenteeRoutingModule {
  static components = [
    MenteeSignupComponent,
    MenteeSubscriptionsComponent
  ]
 }
