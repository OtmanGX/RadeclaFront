import { Component, OnInit } from '@angular/core';
// @ts-ignore
import {default as _rollupMoment, Moment} from 'moment';
import * as _moment from "moment";
import {DashboardService} from '../../services/dashboard.service';
import {fr} from "date-fns/locale";
const moment = _rollupMoment || _moment;


@Component({
  selector: 'app-taux-terrains-hours',
  templateUrl: './taux-terrains-hours.component.html',
  styleUrls: ['./taux-terrains-hours.component.css']
})
export class TauxTerrainsHoursComponent implements OnInit {
  date = moment();
  months:Array<string> = [];
  weeks;
  // Observables
  yearPercentage$;
  dayPercentage$;
  monthPercentage$;
  weekPercentage$;
  constructor(private dashboardService :DashboardService) {
    for (let i = 0; i < 12; i++) {
      this.months.push( fr.localize.month(i, { width: 'abbreviated' }) )
    }
    this.weeks = Array(52).fill(0).map((x,i)=>i+1);
  }

  ngOnInit(): void {
    console.log(this.date);
    this.fetchDay(this.date.toDate());
    this.fetchMonth(this.date.year(), this.date.month());
    this.fetchYear(this.date.year());
    this.fetchWeek(this.date.year(), this.date.week());
  }

  async fetchDay(date: Date) {
    let params = {date: 'day', year: date.getFullYear(), month: date.getMonth()+1, day: date.getDate()};
    this.dayPercentage$ = this.dashboardService.terrain_stats_hours(params);
  }

  async fetchYear(year) {
    let params = {date: 'year', year: year};
    this.yearPercentage$ = this.dashboardService.terrain_stats_hours(params);
  }

  async fetchMonth(year, month) {
    let params = {date: 'month', year: year, month: month};
    this.monthPercentage$ = this.dashboardService.terrain_stats_hours(params);
  }

  async fetchWeek(year, week) {
    let params = {date: 'week', year: year, week: week};
    this.weekPercentage$ = this.dashboardService.terrain_stats_hours(params);
  }

  dayChanged(value: Date) {
    console.log(value);
    this.fetchDay(value)
  }
}
