import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';
import {Title} from '@angular/platform-browser';
import {environment} from '../../../environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;
  errorMessage: string;
  hide = true;
  private error: any;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private title:Title) {
    this.title.setTitle(environment.title + ' | Se connecter');
    this.authService.getCurrentUser().subscribe(() => this.router.navigate(['admin']));
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe(() => {
        this.router.navigateByUrl('/admin');
      }, err => {
        this.errorMessage = err && err.error;
      });
    } else {
      this.errorMessage = 'Please enter valid data';
    }
    }
  }
