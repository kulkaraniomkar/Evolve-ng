import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenteesSignupComponent } from './mentees-signup/mentees-signup.component';
import { MenteesSubscriptionsComponent } from './mentees-subscriptions/mentees-subscriptions.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'signup'},
  { path: 'subscriptions', component: MenteesSubscriptionsComponent,  data: { breadcrumb: 'Subscription'} },
  { path: 'signup', component: MenteesSignupComponent,  data: { breadcrumb: 'Signup'} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenteesRoutingModule {
  static components = [
    MenteesSignupComponent,
    MenteesSubscriptionsComponent
    
  ];
}
