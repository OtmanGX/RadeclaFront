import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {ReservationData} from '../../models/reservation-data';
import {CalendarEvent} from 'angular-calendar';


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
      return item.meta.reservation;
    })
  }

}
