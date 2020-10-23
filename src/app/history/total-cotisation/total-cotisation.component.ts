import {Component, OnInit, ViewChild} from '@angular/core';
import {DashboardService} from "../../services/dashboard.service";


@Component({
  selector: 'app-total-cotisation',
  templateUrl: './total-cotisation.component.html',
  styleUrls: ['./total-cotisation.component.css'],
})
export class TotalCotisationComponent implements OnInit {
  total;
  value;
  constructor(
    private service :DashboardService
  ) {
    this.service.totalCotisation().subscribe(value => {
      this.total = value.total;
      // this.animateValue(0, this.total, 5000);
      let dvalue = document.getElementById("value");
      console.log(dvalue);
    });
  }

  ngOnInit(): void {


  }

  ngAfterViewInit() {
    console.log(this.value);
  }


  animateValue(start, end, duration) {
    let startTimestamp = null;
    let value = this.value;
    console.log(value);
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      value.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

}
