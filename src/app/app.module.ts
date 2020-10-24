import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, LOCALE_ID, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import { DashboardHomeComponent } from './dashboard/dashboard-home/dashboard-home.component';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import localeFr from '@angular/common/locales/fr';
import {registerLocaleData} from '@angular/common';
import { DayViewSchedulerComponent } from './calendar/day-view-scheduler/day-view-scheduler.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReservationdialogComponent } from './dashboard/reservationdialog/reservationdialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ReservationTableComponent } from './dashboard/reservation-table/reservation-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {TokenInterceptor} from './services/token.interceptor';
import { MainViewComponent } from './main-view/main-view.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MembreComponent } from './membre/membre.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AddMembreComponent } from './membre/add-membre/add-membre.component';
import {MatSortModule} from '@angular/material/sort';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatExpansionModule} from '@angular/material/expansion';
import { HistoryComponent } from './history/history.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { TvshowComponent } from './tvshow/tvshow.component';
import { NewmembreComponent } from './membre/newmembre/newmembre.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatChipsModule} from '@angular/material/chips';
import { AddGroupComponent } from './membre/add-group/add-group.component';
import { EntraineurComponent } from './entraineur/entraineur.component';
import {MatTreeModule} from '@angular/material/tree';
import { DhomeComponent } from './dhome/dhome.component';
import { TauxTerrainsComponent } from './history/taux-terrains/taux-terrains.component';
import {MatTabsModule} from '@angular/material/tabs';
import { TopHoursComponent } from './history/top-hours/top-hours.component';
import { TrainingStatsComponent } from './history/training-stats/training-stats.component';
import { TotalCotisationComponent } from './history/total-cotisation/total-cotisation.component';
import { CotisationToPayComponent } from './history/cotisation-to-pay/cotisation-to-pay.component';
import { MembresStatsComponent } from './history/membres-stats/membres-stats.component';
import { BreadComponent } from './history/bread/bread.component';
import { MenuComponent } from './history/menu/menu.component';
import { TauxTerrainsHoursComponent } from './history/taux-terrains-hours/taux-terrains-hours.component';
import { WeatherComponent } from './weather/weather.component';

import { DateFnsModule } from 'ngx-date-fns';
import { OnlineReservationsComponent } from './history/online-reservations/online-reservations.component';
import { PropComponent } from './prop/prop.component';
import {MatSliderModule} from '@angular/material/slider';
import { LightingStatsComponent } from './history/lighting-stats/lighting-stats.component';
import { TournoiComponent } from './tournoi/tournoi.component';
import { TournoiDialogComponent } from './tournoi/tournoi-dialog/tournoi-dialog.component';

import {CounterModule} from 'angular-circle-counter';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { SchoolsComponent } from './schools/schools.component';
import { SchoolDialogComponent } from './schools/school-dialog/school-dialog.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MemberSchoolComponent } from './schools/member-school/member-school.component';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardHomeComponent,
    DayViewSchedulerComponent,
    ReservationdialogComponent,
    ReservationTableComponent,
    MainViewComponent,
    MembreComponent,
    AddMembreComponent,
    HistoryComponent,
    TvshowComponent,
    NewmembreComponent,
    AddGroupComponent,
    EntraineurComponent,
    DhomeComponent,
    TauxTerrainsComponent,
    TopHoursComponent,
    TrainingStatsComponent,
    TotalCotisationComponent,
    CotisationToPayComponent,
    MembresStatsComponent,
    BreadComponent,
    MenuComponent,
    TauxTerrainsHoursComponent,
    WeatherComponent,
    OnlineReservationsComponent,
    PropComponent,
    LightingStatsComponent,
    TournoiComponent,
    TournoiDialogComponent,
    SchoolsComponent,
    SchoolDialogComponent,
    MemberSchoolComponent,
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        HttpClientJsonpModule,
        MatFormFieldModule,
        MatIconModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatCardModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatGridListModule,
        MatDividerModule,
        MatMenuModule,
        LayoutModule,
        CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory}),
        FormsModule,
        NgbModule,
        MatDialogModule,
        MatCheckboxModule,
        MatSelectModule,
        MatToolbarModule,
        MatBadgeModule,
        MatSlideToggleModule,
        MatTooltipModule,
        MatRadioModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatSnackBarModule,
        MatSidenavModule,
        MatListModule,
        AppRoutingModule,
        MatPaginatorModule,
        MatSortModule,
        MatAutocompleteModule,
        MatExpansionModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatStepperModule,
        MatChipsModule,
        MatTreeModule,
        MatTabsModule,
        DateFnsModule.forRoot(),
        MatSliderModule,
        CounterModule,
        MatButtonToggleModule,
    ],schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {provide: LOCALE_ID, useValue: "fr"}],
  bootstrap: [AppComponent]
})
export class AppModule { }
