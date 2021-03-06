import {ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild,} from '@angular/core';
import {map} from 'rxjs/operators';
// Calendar
import {
  addHours,
  isAfter,
  endOfDay,
  endOfMonth,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  addMinutes,
  subMinutes,
  differenceInMinutes
} from 'date-fns';
import {Observable, Subject} from 'rxjs';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, DAYS_OF_WEEK,} from 'angular-calendar';
import {Terrain} from '../../calendar/day-view-scheduler/day-view-scheduler.component';
import {MatDialog} from '@angular/material/dialog';
import {ReservationdialogComponent} from '../reservationdialog/reservationdialog.component';
import {ReservationData} from '../../models/reservation-data';
import {ReservationService} from '../../services/reservation.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Membre} from '../../models/membre';
import {Title} from '@angular/platform-browser';
import {environment} from '../../../environments/environment';

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
  // ,{
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
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit{

  terrains = terrains;
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  locale = 'fr';
  weekStartsOn = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  terrain: string;
  date: Date;


  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  activeDayIsOpen = false;
  membres: Array<Membre>;
  events$: Observable<CalendarEvent<{ reservation: any }>[]>;

  constructor(public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private service:ReservationService,
              private title:Title
              ) {
    this.title.setTitle(environment.title + ' | Calendrier');
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(day=false) {
    let params = {};
    // @ts-ignore
    if (day)
    {
      params = {start_date: addHours(startOfDay(this.viewDate),8).toISOString(), end_date: endOfDay(this.viewDate).toISOString()}
    }
     else
       params = {start_date: startOfMonth(this.viewDate).toISOString(), end_date: endOfMonth(this.viewDate).toISOString(), lite: true}
    this.events$ = this.service.getall(params)
      .pipe(map(( results: any ) =>

      {

        if (day) return results.map((reservation: ReservationData) => {
          return {
            title: 'Réservé',
            color: terrains[reservation.terrain.matricule-1].color,
            start: new Date(reservation.start_date),
            end: addMinutes(new Date(reservation.start_date), reservation.duration*60-1),
            meta: {
              terrain: terrains[reservation.terrain.matricule-1],
              reservation: reservation,
            },
            resizable: {
              beforeStart: false,
              afterEnd: true,
            },
            draggable: true,
          };
        }); else return results.map((reservation: ReservationData) => {
        return {
          start: new Date(reservation.start_date),
          end: addMinutes(new Date(reservation.start_date), reservation.duration*60-1),
        };
      });
      }
      )
    );
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
      this.view = CalendarView.Day;
    }
    console.log('view changed');
    this.activeDayIsOpen = true;
    this.fetchData(true);
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd,
                    }: CalendarEventTimesChangedEvent): void {
    // newEnd = subMinutes(endOfHour(newEnd), 1);
    console.log('eventTimesChanged');
    this.events$ = this.events$.pipe(map(events => { return events.map((iEvent) => {
      if (iEvent.meta.reservation.id === event.meta.reservation.id) {
        console.log('found');
        // newEnd = endOfHour(subMinutes(newEnd, 2));
        event.meta.reservation.start_date = newStart;
        console.log(newStart);
        console.log(newEnd);
        // event.meta.reservation.duration = differenceInHours(newEnd, newStart);
        event.meta.reservation.end_date = newEnd;
        event.meta.reservation.terrain = {id: event.meta.terrain.id+1};
        let duration = Math.round(differenceInMinutes(newEnd, newStart)/60);
        console.log(duration);
        this.service.patch(event.meta.reservation.id, {start_date: event.meta.reservation.start_date,
          duration: duration, terrain: event.meta.reservation.terrain.id})
          .subscribe((result) => console.log(result), error => console.log(error));
        return {
          ...event,
          start: newStart,
          end: newEnd,
          // end: subMinutes(newEnd, 1),
        };
      }
      return iEvent;
    });}));
    this.handleEvent('Dropped or resized', event);
  }

  getReservations(events:CalendarEvent[]) {
    return events.map((item:CalendarEvent) => {
      return item.meta.reservation;
    })
  }

  handleEvent(action: string, event: CalendarEvent): void {
    // console.log(action);
    // console.log(event);
    if (action == 'clicked') {
      this.openDialog(event, true);
    }
    this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEventWithDate(data): void {
    this.events$ = this.events$.pipe(map(events => {
      return [
        ...events,
        {
          title: 'Réservation',
          color: colors.yellow,
          start: data.start_date,
          end: addMinutes(data.start_date, 50),
          meta: {
            terrain: terrains[data.terrain],
            reservation: data,
          },
          resizable: {
            beforeStart: false,
            afterEnd: true,
          },
          draggable: true,
        },
      ];
    }))
  }

  deleteEvent(eventToDelete: CalendarEvent): void {
    console.log('delete');
    this.service.delete(eventToDelete.meta.reservation.id)
      .subscribe((result) => {
        console.log('delete successful');
      }, error => console.log(error))
    this.fetchData(true);
    // this.events$ = this.events$.pipe(map(events => {
    //   events = events.filter((event:CalendarEvent) => event.meta.reservation !== eventToDelete.meta.reservation);
    //   return events;
    // }));
  }

  setView(view: CalendarView): void {
    if (view === CalendarView.Month) {
      this.activeDayIsOpen = false;
    }
    else {
      this.activeDayIsOpen = true;
    }
    this.fetchData(this.activeDayIsOpen);
    this.view = view;
  }

  closeOpenMonthViewDay(): void {
    // this.activeDayIsOpen = false;
    this.fetchData(this.activeDayIsOpen);
  }

  userChanged({ event, newUser }) {
    // event.color = newUser.color;
    event.meta.terrain = newUser;
    this.events = [...this.events];
  }

  hourSegmentClicked(event) {
    if (isAfter(event.date, subMinutes(new Date(), 30)))
      this.openDialog(event);
  }

  openDialog(event, edit= false): void {
    let reservation: ReservationData  = new ReservationData();
    if (!edit) {
      reservation.start_date = event.date;
      reservation.duration = 1;
      reservation.end_date = addHours(event.date, 1);
      reservation.terrain = {id: this.terrains[event.col].id+1};
    } else
    {
      reservation = event.meta.reservation;
      reservation.end_date = addHours(new Date(reservation.start_date), reservation.duration);
    }

    const dialogRef = this.dialog.open(ReservationdialogComponent, {
      width: '850px',
      panelClass: 'panel-dialog',
      data: {reservation: reservation, edit:edit}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        switch (result.action) {
          case 'add': {
            this.fetchData(true);
            this.openSnackBar('Réservation ajoutée', 'Ok')
            break;
          }
          case 'modify':
            this.fetchData(true);
            this.openSnackBar('Réservation modifiée', 'Ok')
            // console.log(this.events);
            // this.events.map(value => {
            //   if (value === event) {
            //     console.log('found');
            //     value.meta.reservation = result.reservation;
            //   }
            // });
            break;

          case 'delete':
          {
            this.openSnackBar('Réservation supprimée', 'Ok');
            this.fetchData(true);
            // this.deleteEvent(event);
            break;
          }
        }
      }
      this.refresh.next();
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
