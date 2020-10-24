import { Injectable } from '@angular/core';
import {APIService} from './api.service';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SchoolService extends APIService {

  baseurl = `${environment.apiUrl}/schools/`;
  constructor(public http: HttpClient) {
    super(http);
  }

}
