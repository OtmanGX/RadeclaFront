import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../services/config.service';

@Component({
  selector: 'app-prop',
  templateUrl: './prop.component.html',
  styleUrls: ['./prop.component.css']
})
export class PropComponent implements OnInit {
  hours = [...Array(16).keys()];

  config;
  constructor(
    private configService:ConfigService
  ) { }

  ngOnInit(): void {
    this.configService.get().subscribe(value => {
      this.config = value
    });
  }

  formatLabel(value: number) {
    return value + 'ans';
  }

  submit(value: any) {
    console.log(value);
    this.configService.post(value).subscribe(value1 => console.log(value1));
  }
}
