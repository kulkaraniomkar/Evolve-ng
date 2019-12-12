import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MentorsGuard } from './core/mentor.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'mentee' },
  // { path: 'mentee', loadChildren: () => import('./mentees/mentees.module').then(m => m.MenteesModule), data: { breadcrumb: 'Mentee Signup'} },
  { path: 'mentee', loadChildren: () => import('./mentee/mentee.module').then(m => m.MenteeModule), data: { breadcrumb: 'Mentee'} },
  { path: 'mentor', loadChildren: () => import('./mentor/mentor.module').then(m => m.MentorModule), data: { breadcrumb: 'Mentor'} },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {useHash: true})],
  exports: [RouterModule],
  providers: [MentorsGuard]
})
export class AppRoutingModule {}
