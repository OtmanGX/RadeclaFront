import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from './auth/login/login.component';
import { DashboardHomeComponent} from './dashboard/dashboard-home/dashboard-home.component';
import {AuthGuard} from './services/auth.guard';
import {MainViewComponent} from './main-view/main-view.component';
import {MembreComponent} from './membre/membre.component';
import {HistoryComponent} from './history/history.component';
import {TvshowComponent} from './tvshow/tvshow.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},
  {path: 'admin',canActivate:[AuthGuard], component: MainViewComponent, children: [
      {path:'', redirectTo: 'calendar', pathMatch: 'full'},
      {path:'membres', component: MembreComponent},
      {path:'calendar', component: DashboardHomeComponent},
      {path:'history', component: HistoryComponent},
      {path:'tvshow', component: TvshowComponent},
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
