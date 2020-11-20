import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminListComponent } from './admin-list/admin-list.component';
import { PendingMenteesComponent } from './pending-mentees/pending-mentees.component';
import { AllocatedMentorsComponent } from './allocated-mentors/allocated-mentors.component';
import { SearchComponent } from './search/search.component';
import { UnallocatedMentorsComponent } from './unallocated-mentors/unallocated-mentors.component';
import { ExploratoryMentorshipComponent } from './exploratory-mentorship/exploratory-mentorship.component';
import { SearchMenteeListComponent } from './search-mentee-list/search-mentee-list.component';
import { MentorshipFormComponent } from './mentorship-form/mentorship-form.component';


const routes: Routes = [
  {
    path: 'list',
    component: AdminListComponent,
    data: { title: 'Admin Subscriptions' },
  },
  {
    path: 'search',
    component: SearchComponent,
    data: { title: 'Search' },
  },
  {
    path: 'activity',
    component: MentorshipFormComponent,
    data: { title: 'Activity Update' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MentorshipAdminRoutingModule {
  static components = [
    AdminListComponent,
    PendingMenteesComponent,
    AllocatedMentorsComponent,
    UnallocatedMentorsComponent,
    ExploratoryMentorshipComponent,
    SearchComponent,
    SearchMenteeListComponent,
    MentorshipFormComponent
  ]
}
