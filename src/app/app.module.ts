import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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

registerLocaleData(localeFr);

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
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
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
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
