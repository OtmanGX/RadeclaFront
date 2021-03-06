import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild,} from '@angular/core';
import {map} from 'rxjs/operators';
// Calendar
import {
  addHours,
  endOfDay,
  startOfDay,
  addMinutes,
} from 'date-fns';
import {Observable, Subject} from 'rxjs';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, DAYS_OF_WEEK,} from 'angular-calendar';
import {Terrain} from '../calendar/day-view-scheduler/day-view-scheduler.component';
import {MatDialog} from '@angular/material/dialog';
import {ReservationData} from '../models/reservation-data';
import {ReservationService} from '../services/reservation.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Membre} from '../models/membre';
import {environment} from '../../environments/environment.prod';
import {Title} from '@angular/platform-browser';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

const terrains: Terrain[] = [
  {
    id: 0,
    name: 'Terrain 1',
    color: colors.blue,
  },
  {
    id: 1,
    name: 'Terrain 2',
    color: colors.blue,
  },
  {
    id: 2,
    name: 'Terrain 3',
    color: colors.blue,
  },
  {
    id: 3,
    name: 'Terrain 4',
    color: colors.blue,
  },
  {
    id: 4,
    name: 'Terrain 5',
    color: colors.blue,
  },
  {
    id: 5,
    name: 'Terrain 6',
    color: colors.blue,
  },
  {
    id: 6,
    name: 'Terrain 7',
    color: colors.blue,
  },
  // {
  //   id: 7,
  //   name: 'Terrain 8',
  //   color: colors.blue,
  // },
  {
    id: 8,
    name: 'Terrain 9',
    color: colors.blue,
  },
  {
    id: 9,
    name: 'Terrain 10',
    color: colors.blue,
  },
];
@Component({
  selector: 'app-tvshow',
  templateUrl: './tvshow.component.html',
  styleUrls: ['./tvshow.component.css']
})
export class TvshowComponent implements OnInit {
  terrains = terrains;
  locale = 'fr';
  view: CalendarView = CalendarView.Day;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  activeDayIsOpen = false;
  membres: Array<Membre>;
  events$: Observable<CalendarEvent<{ reservation: any }>[]>;
  params:any;
  @Output() dateChange = new EventEmitter<Date>();

  constructor(public service:ReservationService,
              protected title:Title
              ) {
    this.title.setTitle(environment.title + ' | Réservations du jour');
  }

  ngOnInit(): void {

    setInterval(()=> {
      this.viewDate = new Date();
      this.fetchData();
    }, 10000);
    this.fetchData();
  }

  fetchData() {
    this.params = {start_date: addHours(startOfDay(this.viewDate),8).toISOString(), end_date: endOfDay(this.viewDate).toISOString()}
    this.events$ = this.service.getall(this.params)
      .pipe(map(( results: any ) => {
          return results.map((reservation: ReservationData) => {
            return {
              title: this.getExtraData(reservation),
              color: terrains[reservation.terrain.matricule-1].color,
              start: new Date(reservation.start_date),
              end: addMinutes(new Date(reservation.start_date), reservation.duration*60-1),
              meta: {
                terrain: terrains[reservation.terrain.matricule-1],
                reservation: reservation,
              },
              resizable: {
                beforeStart: false,
                afterEnd: false,
              },
              draggable: false,
            };
          });
        })
      );
    this.events$.subscribe(value => this.events = value);
  }

  getExtraData(reservation:ReservationData) {
    if (reservation.players.length>2) {
      return `${reservation.players[0].nom.toUpperCase()} <br> ${reservation.players[1].nom.toUpperCase()} <br>X<br>
              ${reservation.players[2].nom} <br>${reservation.players[3].nom.toUpperCase()}`
    } else if (reservation.players.length ===2) return `${reservation.players[0].nom.toUpperCase()} <br>X <br> ${reservation.players[1].nom.toUpperCase()}`;
  }

}
