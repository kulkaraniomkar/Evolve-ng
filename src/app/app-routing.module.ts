import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from './layouts/layouts.module';
import { AppPreloader } from './app-routing-loader';
import { NotFoundComponent } from './pages/404.component';
import { ReactiveFormsModule } from '@angular/forms';
// layouts & notfound
import { LayoutMainComponent } from './layouts/main/main.component';


const COMPONENTS = [NotFoundComponent]
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutMainComponent,
    children: [
      {
        path: 'admin',
        loadChildren: () => import('./pages/mentorship-admin/mentorship-admin.module').then(m => m.MentorshipAdminModule),
      },
      {
        path: 'mentor',
        loadChildren: () => import('./pages/mentor/mentor.module').then(m => m.MentorModule),
      },
      {
        path: 'mentee',
        loadChildren: () => import('./pages/mentee/mentee.module').then(m => m.MenteeModule),
      },
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
      },
      { path: '**', component: NotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: AppPreloader,
    }),
    LayoutsModule,
  ],
  providers: [AppPreloader],
  declarations: [...COMPONENTS],
  exports: [RouterModule]
})
export class AppRoutingModule { }
