import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenteesSignupComponent } from './mentees-signup/mentees-signup.component';
import { MenteesMatchingComponent } from './mentees-matching/mentees-matching.component';
import { MenteesSubscriptionsComponent } from './mentees-subscriptions/mentees-subscriptions.component';
import { MenteeEditComponent } from './mentee-edit/mentee-edit.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'signup'},
  { path: 'signup', component: MenteesSignupComponent,  data: { breadcrumb: 'Signup'} },
 // { path: '', component: MenteesSignupComponent,  data: { breadcrumb: 'Signup'} },
  { path: 'subscriptions', component: MenteesSubscriptionsComponent, data: {breadcrumb: 'Subscriptions'} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenteesRoutingModule {
  static components = [
    MenteesSignupComponent,
    MenteesMatchingComponent,
    MenteeEditComponent,
    MenteesSubscriptionsComponent
  ];
}
