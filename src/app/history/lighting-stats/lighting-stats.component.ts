import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import { Chart } from 'chart.js';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
// @ts-ignore
import {default as _rollupMoment, Moment} from 'moment';
import {DashboardService} from '../../services/dashboard.service';
import {ActivatedRoute} from '@angular/router';
import {fr} from "date-fns/locale";

const moment = _rollupMoment || _moment;
@Component({
  selector: 'app-lighting-stats',
  templateUrl: './lighting-stats.component.html',
  styleUrls: ['./lighting-stats.component.css']
})
export class LightingStatsComponent implements OnInit {

  @ViewChild('barChart') barChart;
  @ViewChild('barChartDay') barChartDay;
  @ViewChild('barChartYear') barChartYear;
  months:Array<string> = [];
  monthChart;
  dayChart;
  yearChart;
  dateDay = moment();
  dateWeek = moment();
  monthStats$;
  yearStats$;
  dayStats$;
  weeks;
  select = 3;
  constructor(private service:DashboardService,
              private activatedRoute :ActivatedRoute) {
    if (this.activatedRoute.snapshot.paramMap.has('select'))
      this.select = parseInt(this.activatedRoute.snapshot.paramMap.get('select'));

    for (let i = 0; i < 12; i++) {
      this.months.push( fr.localize.month(i, { width: 'abbreviated' }) )
    }
  }

  ngOnInit(): void {
    this.fetchMonthChart(2020, 9);
    this.fetchYearChart(2020);
    this.fetchDayChart(this.dateDay.toDate());
  }

  dayChanged(event) {
    const params = {date:'day', 'year': event.year(),
      'month': event.month()+1, 'day':event.date()}
    this.service.terrain_stats(params).subscribe(value => {
      if (this.dayChart) {
        console.log(this.dayChart.data.datasets[0]);
        this.dayChart.data.labels = value.map(val => val.matricule);
        this.dayChart.data.datasets[0].data = value.map(val => val.heures);
        this.dayChart.data.datasets[1].data = value.map(val => val.heures2);
        this.dayChart.options.title.text = event.format('LL');
        this.dayChart.update();
      } else {
        this.dayChart = this.createBarChart(this.barChartDay,
          value.map(val => val.matricule),
          [value.map(val => val.heures), value.map(val => val.heures2)],
          ['Match', 'Entrainement'],
          'Terrain',
          'Heures',
          event.format('LL'),
        )
      }
    }, error => console.log(error));
  }

  fetchDayChart(date: Date) {
    let params = {date: 'day', year: date.getFullYear(), month: date.getMonth()+1, day: date.getDate()};
    this.dayStats$ = this.service.lighting_stats(
      params)

    this.dayStats$.subscribe(value=> {
      if (this.dayChart) {
        console.log(this.monthChart.data.datasets[0]);
        this.dayChart.data.labels = value.map(val => val.matricule);
        this.dayChart.data.datasets[0].data = value.map(val => val.heures);
        this.dayChart.options.title.text = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear() + `(total= ${value.reduce((sum, current) => sum + current.heures, 0)})`;
        this.dayChart.update();
      } else this.dayChart = this.createBarChart(this.barChartDay,
        value.map(val => val.matricule),
        [value.map(val => val.heures), value.map(val => val.heures2)],
        ['Heures d\'éclairage',],
        'Terrains',
        'Heures',
        date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear() + `(total= ${value.reduce((sum, current) => sum + current.heures, 0)})`,
      )
    });
  }

  fetchMonthChart(year, month) {
    let params = {date: 'month', year: year, month: month+1};
    this.monthStats$ = this.service.lighting_stats(
      params)

    this.monthStats$.subscribe(value=> {
      if (this.monthChart) {
        console.log(this.monthChart.data.datasets[0]);
        this.monthChart.data.labels = value.map(val => val.matricule);
        this.monthChart.data.datasets[0].data = value.map(val => val.heures);
        this.monthChart.options.title.text = this.months[month] + `(total= ${value.reduce((sum, current) => sum + current.heures, 0)})`;
        this.monthChart.update();
      } else this.monthChart = this.createBarChart(this.barChart,
        value.map(val => val.matricule),
        [value.map(val => val.heures), value.map(val => val.heures2)],
        ['Heures d\'éclairage',],
        'Terrains',
        'Heures',
        this.months[month] + `(total= ${value.reduce((sum, current) => sum + current.heures, 0)})`,
      )
    });
  }

  fetchYearChart(year) {
    let params = {date: 'year', year: year};
    this.yearStats$ = this.service.lighting_stats(
      params)

    this.yearStats$.subscribe(value=> {
      if (this.yearChart) {
        console.log(this.yearChart.data.datasets[0]);
        this.yearChart.data.labels = value.map(val => val.matricule);
        this.yearChart.data.datasets[0].data = value.map(val => val.heures);
        this.yearChart.options.title.text = year + `(total= ${value.reduce((sum, current) => sum + current.heures, 0)})`;
        this.yearChart.update();
      } else this.yearChart = this.createBarChart(this.barChartYear,
        value.map(val => val.matricule),
        [value.map(val => val.heures), value.map(val => val.heures2)],
        ['Heures d\'éclairage',],
        'Terrains',
        'Heures',
        year + `(total= ${value.reduce((sum, current) => sum + current.heures, 0)})`,
      )
    });
  }

  createBarChart(chart, labels, data, legend, xLabel, yLabel?, title?) {
    return new Chart(chart.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: legend[0],
          data: data[0],
          backgroundColor: '#ffd740', // array should have same number of elements as number of dataset
          borderColor: 'black',// array should have same number of elements as number of dataset
          borderWidth: 1
        },
        ]
      },
      options: {
        title: {
          display: title!==undefined,
          position: 'top',
          fontSize: 22,
          text: title,
        },
        legend: {
          display: legend!== undefined,
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        responsive: true,
        animation: {
          animateScale: true,
          animateRotate: true
        },
        scales: {
          xAxes: [{
            stacked:true,
            scaleLabel: {
              display: true,
              labelString: xLabel,
              fontSize: 22,
            },
            gridLines: {
              display: true,
              drawBorder: true,
              drawOnChartArea: false,
            }
          }],
          yAxes: [{
            stacked: true,
            scaleLabel: {
              display: true,
              labelString: yLabel,
            },
            gridLines: {
              display: true,
              drawBorder: true,
              drawOnChartArea: false,
            },
            ticks: {
              beginAtZero: true,
              autoSkip: true,
              autoSkipPadding: 25,
              stepSize: 1
            }
          }]
        }
      }
    });
  }

}
