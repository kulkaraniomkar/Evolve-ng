import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    data: { title: 'Welcome' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
  static components = [
    WelcomeComponent
  ]
}
