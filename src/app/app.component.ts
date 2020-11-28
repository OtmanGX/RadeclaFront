import { Component } from '@angular/core';
import { LoginComponent} from './auth/login/login.component';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from './services/auth.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'radeclaFront';

  constructor(private authService: AuthService,
              private router: Router,) {
    this.authService.getCurrentUser().subscribe(() => this.router.navigate(['admin']),
      error => this.router.navigate(['login']));
  }
}
