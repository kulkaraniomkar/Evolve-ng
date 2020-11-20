import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MentorSignupComponent } from './mentor-signup/mentor-signup.component';
import { MentorSubscriptionsComponent } from './mentor-subscriptions/mentor-subscriptions.component';


const routes: Routes = [
  {
    path: 'signup',
    component: MentorSignupComponent,
    data: { title: 'Mentor Signup' },
  },
  {
    path: 'my-mentees',
    component: MentorSubscriptionsComponent,
    data: { title: 'Subscriptions' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MentorRoutingModule { 
  static components = [
    MentorSignupComponent,
    MentorSubscriptionsComponent
  ]
}
