import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenteesSignupComponent } from './mentees-signup/mentees-signup.component';
import { MenteesMatchingComponent } from './mentees-matching/mentees-matching.component';
import { MenteesSubscriptionsComponent } from './mentees-subscriptions/mentees-subscriptions.component';
import { MenteeEditComponent } from './mentee-edit/mentee-edit.component';

const routes: Routes = [
  { path: '', component: MenteesSignupComponent },
  { path: 'subscriptions', component: MenteesSubscriptionsComponent },
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
