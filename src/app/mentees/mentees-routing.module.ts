import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenteesSignupComponent } from './mentees-signup/mentees-signup.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'signup'},
  { path: 'signup', component: MenteesSignupComponent,  data: { breadcrumb: 'Signup'} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenteesRoutingModule {
  static components = [
    MenteesSignupComponent,
    
  ];
}
