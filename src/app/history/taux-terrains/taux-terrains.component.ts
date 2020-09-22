import {Component, OnInit, ViewChild} from '@angular/core';
import { Chart } from 'chart.js';

// DatePicker
import {FormControl} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
// @ts-ignore
import {default as _rollupMoment, Moment} from 'moment';
import {DashboardService} from '../../services/dashboard.service';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-taux-terrains',
  templateUrl: './taux-terrains.component.html',
  styleUrls: ['./taux-terrains.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class TauxTerrainsComponent implements OnInit {
  @ViewChild('barChart') barChart;
  monthChart;
  date = new FormControl(moment());
  monthStats$;

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    console.log("choosen month called");
    const ctrlValue = this.date.value;
    console.log(normalizedMonth);
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
    this.fetchMonthChart();
  }
  constructor(private service:DashboardService) { }

  ngOnInit(): void {
    console.log(this.date.value.year(), this.date.value.month())
    this.fetchMonthChart();
  }


  fetchMonthChart() {
    this.monthStats$ = this.service.terrain_stats(
      {
        date:'month', 'year': this.date.value.year(),
        'month': this.date.value.month()+1})

    this.monthStats$.subscribe(value=> {
      if (this.monthChart) {
        console.log(this.monthChart.data.datasets[0]);
        this.monthChart.data.labels = value.map(val => val.matricule);
        this.monthChart.data.datasets[0].data = value.map(val => val.heures);
        this.monthChart.data.datasets[1].data = value.map(val => val.heures2);
        this.monthChart.options.title.text = this.date.value.format('MMMM');
        this.monthChart.update();
      } else this.createBarChart(this.barChart,
        value.map(val => val.matricule),
        [value.map(val => val.heures), value.map(val => val.heures2)],
        ['Match', 'Entrainement'],
        'Terrain',
        'Heures',
        this.date.value.format('MMMM'),
      )
    });
  }


  createBarChart(chart, labels, data, legend, xLabel, yLabel?, title?) {
    this.monthChart = new Chart(chart.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: legend[0],
          data: data[0],
          backgroundColor: '#ffd740', // array should have same number of elements as number of dataset
          borderColor: 'black',// array should have same number of elements as number of dataset
          borderWidth: 1
        },{
          label: legend[1],
          data: data[1],
          backgroundColor: '#14a9d4', // array should have same number of elements as number of dataset
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
