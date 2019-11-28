import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MentorsSignupComponent } from './mentors-signup/mentors-signup.component';
import { MentorsFormComponent } from './mentors-form/mentors-form.component';


const routes: Routes = [
  { path: '', component: MentorsSignupComponent,  data: { breadcrumb: 'Mentors'} }
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
