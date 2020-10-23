import { Component, OnInit } from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {DashboardService} from '../services/dashboard.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  events: string[] = [];
  opened: boolean;
  date: Date;
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
    setInterval(()=> {this.fetchData()}, 60000);

  }

  fetchData() {
    this.date = new Date();
    this.stats$ = this.dashboardService.main_stats();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
