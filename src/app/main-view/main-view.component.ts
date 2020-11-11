import { Component, OnInit } from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {DashboardService} from '../services/dashboard.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
// Animation
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css'],
  animations: [
    trigger('scroll', [
      state('on', style({left: '0px'})),
      transition('* => *', [
        style({left: '0px'}),
        animate(10000, style({left: '300px'}))
      ])
    ])
  ]
})
export class MainViewComponent implements OnInit {
  events: string[] = [];
  opened: boolean;
  date: Date;
  state = 0;
  stats$;
  links: [
    {'name': 'Calendrier', link:'sss'},
    {'name': 'Membres', link:'sss'},
    {'name': 'Historique', link:'sss'},
  ];
  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private dashboardService: DashboardService,
              private authService: AuthService,
              private router: Router) {
    this.matIconRegistry.addSvgIcon(
      "tennis",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/sports_tennis.svg")
    );
  }

  ngOnInit(): void {
    this.fetchData();
    setInterval(()=> {this.fetchData()}, 600000);

  }

  fetchData() {
    this.date = new Date();
    this.stats$ = this.dashboardService.main_stats();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  scrollDone() {
    this.state++;
  }
}
