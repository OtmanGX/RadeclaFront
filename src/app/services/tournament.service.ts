import { Injectable } from '@angular/core';
import {APIService} from './api.service';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TournamentService extends APIService {

  baseurl = `${environment.apiUrl}/tournois/`;
  constructor(public http: HttpClient) {
    super(http);
  }

}
