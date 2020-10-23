import { Component, OnInit } from '@angular/core';
import {ReservationData} from '../../models/reservation-data';
import {ReservationService} from '../../services/reservation.service';
import {TvshowComponent} from '../../tvshow/tvshow.component';


@Component({
  selector: 'app-online-reservations',
  templateUrl: './online-reservations.component.html',
  styleUrls: ['./online-reservations.component.css']
})
export class OnlineReservationsComponent extends TvshowComponent implements OnInit {
  todayDate = new Date();
  constructor(public service:ReservationService) {
    super(service);
  }

  ngOnInit(): void {
    this.fetchData();
  }

  getExtraData(reservation:ReservationData) {
    return reservation.created_by.username;
  }

  dayChanged(value: Date) {
    this.viewDate = value;
    console.log('day changed');
    this.fetchData();
  }
}
