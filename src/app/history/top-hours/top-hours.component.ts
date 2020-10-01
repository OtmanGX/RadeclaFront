import {Component, OnInit, ViewChild} from '@angular/core';
import { Chart } from 'chart.js';
import {DashboardService} from "../../services/dashboard.service";

  const COLORS = {
  black: 'rgb(0, 0, 0)',
  red: 'rgb(255, 99, 132)',
  red2: 'rgb(255, 0, 0)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  yellow2: 'rgb(255, 252, 80)',
  green: 'rgb(75, 192, 192)',
  green2: 'rgb(0, 192, 0)',
  green3: 'rgb(126, 255, 0)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
};

Chart.defaults.global.defaultFontSize = 15;

@Component({
  selector: 'app-top-hours',
  templateUrl: './top-hours.component.html',
  styleUrls: ['./top-hours.component.css']
})
export class TopHoursComponent implements OnInit {

  @ViewChild('hourChart') hourBarChart;
  hourChart;
  datasets = new Array();
  colors = Object.values(COLORS);
  constructor(
    private service: DashboardService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.fetchData();
  }

  fetchData() {
    this.service.hours_stats().subscribe(value => {
      if (this.hourChart == undefined) {
        console.log('initialise hourChart');
        this.datasets.push({label: 'Nombre de fois',
          data: value.map(val => val.nb),
          backgroundColor: '#ffd740', // array should have same number of elements as number of dataset
          borderColor: 'black',// array should have same number of elements as number of dataset
          borderWidth: 1});
        this.hourChart = this.createBarChart(this.hourBarChart,
          value.map(val => val.hour+1+":00"),
          this.datasets,
          'Heure',
          ''
        )
      } else {
        this.hourChart.data.labels = value.map(val => val.hour+1+":00");
        this.hourChart.data.datasets = [
          {
            label: 'Nombre de fois',
              data: value.map(val => val.nb),
            backgroundColor: '#ffd740', // array should have same number of elements as number of dataset
            borderColor: 'black',// array should have same number of elements as number of dataset
            borderWidth: 1
          }]
        this.hourChart.update()
        }

    })
  }



  createBarChart(chart, labels, data, xLabel, yLabel?, title?) {
    return new Chart(chart.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: data}
      ,
      options: {
        title: {
          display: title!==undefined,
          position: 'top',
          fontSize: 22,
          text: title,
        },
        legend: {
          display: true,
        },
        responsive: true,
        animation: {
          animateScale: true,
          animateRotate: true
        },
        scales: {
          xAxes: [{
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

  checkboxChange(state: boolean) {
    if (state) {
      this.service.hours_stats({age: true}).subscribe(res => {
        this.hourChart.data.labels = Object.keys(res[Object.keys(res)[0]]).map(value=> parseInt(value)+1+':00');
        this.hourChart.data.datasets = [];
        let index = 0;
        for (const [key, value] of Object.entries(res)) {
          this.hourChart.data.datasets.push({label: key,
            data: Object.values(value),
            backgroundColor: this.colors[index], // array should have same number of elements as number of dataset
            borderColor: 'black',// array should have same number of elements as number of dataset
            borderWidth: 1});
          index++;
        }
        this.hourChart.update();
      })
    } else {
      this.fetchData();
    }
  }
}
