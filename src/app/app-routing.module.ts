import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from './auth/login/login.component';
import { DashboardHomeComponent} from './dashboard/dashboard-home/dashboard-home.component';
import {AuthGuard} from './services/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},
  {path: 'dashboard', component: DashboardHomeComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
