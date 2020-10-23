import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {addDays} from 'date-fns';
import { fr } from 'date-fns/locale';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  @Input() date;
  private long: number;
  private lat: number;
  private appKey: string;
  public weather: any;
  public dateOptions = {
    locale: fr
  }

  constructor(private http: HttpClient) {
    this.appKey = "13f17690254b7c017fdbab1a0fcc6847";
    this.long = -5.803610;
    this.lat = 35.770390;
    this.weather = [];
  }

  ngOnInit(): void {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords);
      });
    } else {
      console.error("The browser does not support geolocation...");
    }
    this.getWeather();
  }

  public getWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.long}&exclude=hourly,minutely,current&appid=${this.appKey}&units=metric`).then(
      response => response.json()).then(data => this.weather = data.daily);
  }

  public toTextualDescription(degree){
    if (degree>337.5) return 'Northerly';
    if(degree>247.5) return 'Westerly';
    if(degree>157.5) return 'Southerly';
    if(degree>67.5) return 'Easterly';
    return 'Northerly';
  }

}
