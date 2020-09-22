import { Component, OnInit } from '@angular/core';


const OPTIONS =  [
  {name: 'Liste des adhérants', link: ['/admin/membres']},
  {name: "Liste des adhérants qui n'ont toujours pas payés la cotisation", link: ['/admin/membres', {cotisation__paye: false}]},
  {name: "Total cotisation année 2020", link: ''},
  {name: "Total cotisation à payer", link: ''},
  {name: "Taux d'occupation des terrains", link: ['/admin/tauxTerrains']},

]
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  options = OPTIONS;
  constructor() { }

  ngOnInit(): void {
  }

}
