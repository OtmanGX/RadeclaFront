import { Component, OnInit } from '@angular/core';
import {Membre} from '../../models/membre';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {DashboardService} from '../../services/dashboard.service';
import {MembreService} from '../../services/membre.service';
import {fr} from "date-fns/locale";
import {map, startWith} from 'rxjs/operators';
// @ts-ignore
import {default as _rollupMoment, Moment} from 'moment';
import * as _moment from "moment";
import {ActivatedRoute} from '@angular/router';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-membres-stats',
  templateUrl: './membres-stats.component.html',
  styleUrls: ['./membres-stats.component.css']
})
export class MembresStatsComponent implements OnInit {
  months:Array<string> = [];
  weeks;
  date = moment();
  monthMembers$;
  yearMembers$;
  weekMembers$;

  displayedColumns: string[] = ['nom', 'match', 'entrainement', 'total'];

  constructor(
    private dashboardService :DashboardService,
    private activatedRoute: ActivatedRoute
  ) {
    if (this.activatedRoute.snapshot.paramMap.get('match')) {
      this.displayedColumns = ['nom', 'match'];
    }
    for (let i = 0; i < 12; i++) {
      this.months.push( fr.localize.month(i, { width: 'abbreviated' }) )
    }
    this.weeks = Array(52).fill(0).map((x,i)=>i+1);
  }

  ngOnInit(): void {
    this.fetchMonth(this.date.year(), this.date.month());
    this.fetchWeek(this.date.year(), this.date.week());
    this.fetchYear(this.date.year());
  }


  async fetchMonth(year, month) {
    let params = {date: 'month', year: year, month: month+1};
    this.monthMembers$ = this.dashboardService.membres_stats(params);
  }

  async fetchYear(year) {
    let params = {date: 'year', year: year};
    this.yearMembers$ = this.dashboardService.membres_stats(params);
  }

  async fetchWeek(year, week) {
    let params = {date: 'week', year: year, week: week};
    this.weekMembers$ = this.dashboardService.membres_stats(params);
  }
}
