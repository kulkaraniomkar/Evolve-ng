import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MentorsSignupComponent } from './mentors-signup/mentors-signup.component';
import { MentorsFormComponent } from './mentors-form/mentors-form.component';
import { MentorsSubscriptionsComponent } from './mentors-subscriptions/mentors-subscriptions.component';


const routes: Routes = [
    { path: '', component: MentorsSubscriptionsComponent,  data: { breadcrumb: 'Subscriptions'} },
    { path: 'signup', component: MentorsSignupComponent,  data: { breadcrumb: 'Signup'} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MentorsRoutingModule {
  static components = [
    MentorsSignupComponent,
    MentorsFormComponent
  ]
}
