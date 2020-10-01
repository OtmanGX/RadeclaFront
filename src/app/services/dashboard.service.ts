import { Injectable } from '@angular/core';
import {APIService} from './api.service';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends APIService {

  baseurl = `${environment.apiUrl}/dashboard/`;
  constructor(public http: HttpClient) {
    super(http);
  }

  get(): Observable<any> {
    return this.http.get(`${this.baseurl}`);
  }

  terrain_stats(params?):Observable<any> {
    return this.http.get(`${this.baseurl}terrains`,{params: params});
  }

  hours_stats(params?): Observable<any> {
    return this.http.get(`${this.baseurl}hours`, {params});
  }

  training_stats(params?): Observable<any> {
    return this.http.get(`${this.baseurl}training`, {params});
  }

  totalCotisation(): Observable<any> {
    return this.http.get(`${this.baseurl}totalcotisation`, );
  }

  cotisationToPay(): Observable<any> {
    return this.http.get(`${this.baseurl}cotisationapayer`, );
  }

  membres_stats(params?): Observable<any> {
    return this.http.get(`${this.baseurl}members_stats`, {params});
  }

  terrain_stats_hours(params?): Observable<any> {
    return this.http.get(`${this.baseurl}terrain_stats_hour`, {params});
  }

}
