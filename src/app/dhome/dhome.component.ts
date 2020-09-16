import {Component, OnInit, ViewChild} from '@angular/core';
import { Chart } from 'chart.js';
import {DashboardService} from '../services/dashboard.service';

@Component({
  selector: 'app-dhome',
  templateUrl: './dhome.component.html',
  styleUrls: ['./dhome.component.css']
})
export class DhomeComponent implements OnInit {
  bars: any;
  colorArray: any;
  // barCharts
  @ViewChild('barChart') barChart;
  @ViewChild('barChart2') barChart2;
  @ViewChild('barChart3') barChart3;
  @ViewChild('barHorizontalChart') barHorizontalChart;
  @ViewChild('hourchart') hourchart;
  avg_hours: number;
  nentraineurs: number;
  nmembres: number;
  nexternes: number;

  constructor(private service:DashboardService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.service.get().subscribe(value =>
    {
      // Vars
      this.avg_hours = value.avg_hours;
      // Charts
      this.createBarChart(this.barChart,
        value.terrainMonth.map(val => val.matricule),
        value.terrainMonth.map(val => val.heures),
        'Nombre d\'heures par terrain',
        'Terrain',
        'Heures',
        'Mensuel',
      )
      this.createBarChart(this.barChart2,
        value.terrainWeek.map(val => val.matricule),
        value.terrainWeek.map(val => val.heures),
        undefined,
        'Terrain',
        'Heures',
        'Hebdomadaire',
      )
      this.createBarChart(this.barChart3,
        value.terrainDay.map(val => val.matricule),
        value.terrainDay.map(val => val.heures),
        undefined,
        'Terrain',
        'Heures',
        'Journalier',
      )

      this.createBarChart(this.hourchart,
        value.hours.map(val => val.hour+1+":00"),
        value.hours.map(val => val.nb),
        'Nombre de fois',
        'Heure',
        ''
      )

      this.createHorizontalBarChart(this.barHorizontalChart,
        value.entraineur[0].map(val => val.nom),
        value.entraineur.map(val => val.map(val => val.total)),
        'Nombre d\'heures par entraineur'
      )

      this.nentraineurs = value.nentraineurs;
      this.nmembres = value.nmembres;
      this.nexternes = value.nexternes;
    })
  }


  createBarChart(chart, labels, data, legend, xLabel, yLabel?, title?) {
    let bars = new Chart(chart.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: legend,
          data: data,
          backgroundColor: '#ffd740', // array should have same number of elements as number of dataset
          borderColor: 'black',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
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

  createHorizontalBarChart(chart, labels, data, legend?) {
    let bars = new Chart(chart.nativeElement, {
      type: 'horizontalBar',
      data: {
        labels: labels,
        datasets: [
          {
          label: 'Ce mois',
          data: data[0],
          backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
        },
        {
          label: 'Cette semaine',
          data: data[1],
          backgroundColor: 'rgb(221,128,89)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
        },
          {
          label: 'Ce jour',
          data: data[2],
          backgroundColor: 'rgb(89,137,221)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
        },

        ]
      },
      options: {
        legend: {
          display: legend,
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
              labelString: 'Heures',
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
          }],
          yAxes: [{
            gridLines: {
              display: true,
              drawBorder: true,
              drawOnChartArea: false,
            },
            ticks: {
              beginAtZero: true,
              // stepSize: 1
            }
          }]
        }
      }
    });
  }


}
