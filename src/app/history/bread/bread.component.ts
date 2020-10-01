import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-bread',
  templateUrl: './bread.component.html',
  styleUrls: ['./bread.component.css']
})
export class BreadComponent implements OnInit {

  @Input() menuItem;
  constructor() { }

  ngOnInit(): void {
  }

}
