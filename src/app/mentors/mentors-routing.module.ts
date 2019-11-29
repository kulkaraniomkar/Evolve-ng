import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MentorsSignupComponent } from './mentors-signup/mentors-signup.component';
import { MentorsFormComponent } from './mentors-form/mentors-form.component';
import { MentorsSubscriptionsComponent } from './mentors-subscriptions/mentors-subscriptions.component';


const routes: Routes = [
  { path: '', component: MentorsSignupComponent,  data: { breadcrumb: 'Mentors'} },
  { path: 'subscriptions', component: MentorsSubscriptionsComponent,  data: { breadcrumb: 'Subscriptions'} }
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
