import { Component, OnInit } from '@angular/core';
import {DashboardService} from "../../services/dashboard.service";

@Component({
  selector: 'app-cotisation-to-pay',
  templateUrl: './cotisation-to-pay.component.html',
  styleUrls: ['./cotisation-to-pay.component.css']
})
export class CotisationToPayComponent implements OnInit {

  total$;
  constructor(
    private service :DashboardService
  ) { }

  ngOnInit(): void {
    this.total$ = this.service.cotisationToPay();
  }

}
