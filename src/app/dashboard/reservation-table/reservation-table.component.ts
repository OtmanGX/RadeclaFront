import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {ReservationData} from '../../models/reservation-data';
import {CalendarEvent} from 'angular-calendar';
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
  endOfHour,
  differenceInHours
} from 'date-fns';

@Component({
  selector: 'app-reservation-table',
  templateUrl: './reservation-table.component.html',
  styleUrls: ['./reservation-table.component.css']
})
export class ReservationTableComponent implements OnInit {
  displayedColumns: string[] = ['terrain', 'start_date', 'end_date', 'lightning', 'paid', 'actions'];
  // dataSource = ELEMENT_DATA;
  @Input() dataSource: CalendarEvent[];
  @Output() editEvent = new EventEmitter<CalendarEvent>();
  @Output() deleteEvent = new EventEmitter<CalendarEvent>();
  reservations : ReservationData[];
  constructor() { }

  ngOnInit(): void {
    this.reservations = this.dataSource.map((item:CalendarEvent) => {
      let reservation = item.meta.reservation;
      reservation.end_date = addHours(new Date(reservation.start_date), reservation.duration);
      return reservation;
    })
  }

}
