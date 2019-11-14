import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'mentee'},
  {path: 'mentor', loadChildren: () => import('./mentors/mentors.module').then(m => m.MentorsModule)},
  {path: 'mentee', loadChildren: () => import('./mentees/mentees.module').then(m => m.MenteesModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
