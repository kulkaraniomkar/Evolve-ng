import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { MentorsSignupComponent } from './mentors-signup/mentors-signup.component';

const routes: Routes = [
  { path: '', component: MentorsSignupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MentorsRoutingModule {
  static components = [
    MentorsSignupComponent
  ];
}
