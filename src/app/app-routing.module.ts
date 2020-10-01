import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from './auth/login/login.component';
import { DashboardHomeComponent} from './dashboard/dashboard-home/dashboard-home.component';
import {AuthGuard} from './services/auth.guard';
import {MainViewComponent} from './main-view/main-view.component';
import {MembreComponent} from './membre/membre.component';
import {TvshowComponent} from './tvshow/tvshow.component';
import {NewmembreComponent} from './membre/newmembre/newmembre.component';
import {AddGroupComponent} from './membre/add-group/add-group.component';
import {EntraineurComponent} from './entraineur/entraineur.component';
import {DhomeComponent} from './dhome/dhome.component';
import {HistoryComponent} from './history/history.component';
import {TauxTerrainsComponent} from './history/taux-terrains/taux-terrains.component';
import {TopHoursComponent} from "./history/top-hours/top-hours.component";
import {TrainingStatsComponent} from "./history/training-stats/training-stats.component";
import {TotalCotisationComponent} from "./history/total-cotisation/total-cotisation.component";
import {CotisationToPayComponent} from "./history/cotisation-to-pay/cotisation-to-pay.component";
import {MembresStatsComponent} from './history/membres-stats/membres-stats.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},
  {path: 'admin',canActivate:[AuthGuard], component: MainViewComponent, children: [
      {path:'', redirectTo: 'dashboard', pathMatch: 'full'},
      {path:'dashboard', component: DhomeComponent},
      {path:'membres', component: MembreComponent},
      {path:'entraineur', component: EntraineurComponent},
      {path:'membre', component: NewmembreComponent},
      {path:'groupe', component: AddGroupComponent},
      {path:'calendar', component: DashboardHomeComponent},
      {path:'history', component: HistoryComponent},
        {path:'history/adherants', component: HistoryComponent},
        {path:'history/terrains', component: HistoryComponent},
        {path:'history/entraineurs', component: HistoryComponent},
        {path:'history/cotisations', component: HistoryComponent},
      {path:'tvshow', component: TvshowComponent},
      {path:'tauxTerrains', component: TauxTerrainsComponent},
      {path:'hours', component: TopHoursComponent},
      {path:'training', component: TrainingStatsComponent},
      {path:'totalcotisation', component: TotalCotisationComponent},
      {path:'cotisationtopay', component: CotisationToPayComponent},
      {path:'membresStats', component: MembresStatsComponent},
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
