import { Component, OnInit } from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {DashboardService} from '../services/dashboard.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
// Animation
import { trigger, state, style, animate, transition } from '@angular/animations';
import {BehaviorSubject} from 'rxjs';
import {distinctUntilChanged, switchMap} from 'rxjs/operators';


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
  stats = new BehaviorSubject<any>('');
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
    this.stats$ = this.stats.pipe(
      distinctUntilChanged(),
      switchMap(()=> {
      this.date = new Date();
      return this.dashboardService.main_stats();
    }));
    setInterval(()=> {this.stats.next('')}, 60000);
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  scrollDone() {
    this.state++;
  }
}
