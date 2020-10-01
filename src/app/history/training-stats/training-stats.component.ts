import { Component, OnInit } from '@angular/core';
import { fr } from 'date-fns/locale';
import {DashboardService} from "../../services/dashboard.service";
// @ts-ignore
import {default as _rollupMoment, Moment} from 'moment';
import * as _moment from "moment";
import {MembreService} from "../../services/membre.service";
import {Membre} from "../../models/membre";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {FormControl} from "@angular/forms";

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-training-stats',
  templateUrl: './training-stats.component.html',
  styleUrls: ['./training-stats.component.css']
})
export class TrainingStatsComponent implements OnInit {
  months:Array<string> = [];
  weeks;
  date = moment();
  monthTraining$;
  yearTraining$;
  weekTraining$;
  // filtering
  membres: Membre[];
  filteredOptions: Observable<string[]>;
  yearControl = new FormControl();
  monthControl = new FormControl();
  weekControl = new FormControl();

  constructor(
    private dashboardService :DashboardService,
    private membreService :MembreService
  ) {
    for (let i = 0; i < 12; i++) {
      this.months.push( fr.localize.month(i, { width: 'abbreviated' }) )
    }
    this.weeks = Array(52).fill(0).map((x,i)=>i+1);
  }

  ngOnInit(): void {
    this.membreService.getAllByPage({all:true, entraineur: false}).subscribe(value => {
      this.membres = value;
      this.filteredOptions = this.yearControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });
    this.fetchMonth(this.date.year(), this.date.month(), false);
    this.fetchWeek(this.date.year(), this.date.week(), false);
    this.fetchYear(this.date.year(), false);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.membres.map(value1 => value1.nom).filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  fetchMonth(year, month, withMember) {
    let params = {};
    if (withMember) params = {date: 'month', year: year, month: month+1, with: this.monthControl.value};
    else params = {date: 'month', year: year, month: month+1};
    this.monthTraining$ = this.dashboardService.training_stats(params);
  }

  fetchYear(year, withMember) {
    console.log(this.yearControl.value);
    let params = {}
    if (withMember)
      params = {date: 'year', year: year, with: this.yearControl.value};
    else params = {date: 'year', year: year};
    this.yearTraining$ = this.dashboardService.training_stats(params);
  }

  fetchWeek(year, week, withMember) {
    let params = {}
    if (withMember) params = {date: 'week', year: year, week: week, with: this.weekControl.value};
    else params = {date: 'week', year: year, week: week};
    this.weekTraining$ = this.dashboardService.training_stats(params);
  }
}
