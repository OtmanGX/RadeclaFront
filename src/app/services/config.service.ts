import { Injectable } from '@angular/core';
import {APIService} from './api.service';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  baseurl = `${environment.apiUrl}/config/configs`;
  constructor(public http: HttpClient) {
  }

  get(params?): Observable<any[]> {
    return this.http.get<any[]>(this.baseurl, {params});
  }

  post(data: any) {
    return this.http.post(this.baseurl, data);
  }

}
