import { Component, OnInit } from '@angular/core';
import {DashboardService} from "../../services/dashboard.service";

@Component({
  selector: 'app-total-cotisation',
  templateUrl: './total-cotisation.component.html',
  styleUrls: ['./total-cotisation.component.css']
})
export class TotalCotisationComponent implements OnInit {
  total$;
  constructor(
    private service :DashboardService
  ) { }

  ngOnInit(): void {
    this.total$ = this.service.totalCotisation();
  }

}
