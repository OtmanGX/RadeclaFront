import {Component, OnInit, ViewChild} from '@angular/core';
import {addHours, endOfDay, endOfMonth, startOfDay, startOfMonth} from 'date-fns';
import {map} from 'rxjs/operators';
import {ReservationData} from '../models/reservation-data';
import {ReservationService} from '../services/reservation.service';
import {Observable} from 'rxjs';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {MembreService} from '../services/membre.service';
import {Membre} from '../models/membre';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  displayedColumns: string[] = ['terrain', 'start_date', 'end_date','joueur1', 'joueur2', 'joueur3', 'joueur4', 'type', 'lightning', 'paid'];
  reservations: ReservationData[];
  members = new Map<number, Membre>();
  myDate: Date;

  // Sort
  dataSource = new MatTableDataSource<ReservationData>([]);
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private reservationService:ReservationService,
              private membreService:MembreService) { }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.myDate = new Date();
    this.membreService.getAll({all:true}).subscribe(value =>
    {
      for (let member of value)
        this.members.set(member.id, member);
      this.fetchData(this.myDate);
    })
  }


  fetchData(date) {
    let params = {start_date: addHours(startOfDay(date),8).toISOString(), end_date: endOfDay(date).toISOString()}
    this.reservationService.getall(params).subscribe(value => {
      this.reservations = <ReservationData[]>value;
      this.dataSource.data = <ReservationData[]>value;
    });
  }

  changeDate(date) {
    console.log(date);
    this.fetchData(<Date>date);
  }
}
