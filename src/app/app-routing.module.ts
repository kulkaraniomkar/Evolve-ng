import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MentorsGuard } from './core/mentor.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'mentees' },
  { path: 'mentees', loadChildren: () => import('./mentees/mentees.module').then(m => m.MenteesModule), data: { breadcrumb: 'Mentee Signup'} },
  { path: 'mentors', loadChildren: () => import('./mentors/mentors.module').then(m => m.MentorsModule), data: { breadcrumb: 'Mentor'}, canActivate: [MentorsGuard] },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {useHash: true})],
  exports: [RouterModule],
  providers: [MentorsGuard]
})
export class AppRoutingModule {}
