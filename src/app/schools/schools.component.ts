import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {Tournoi} from '../models/tournoi';
import {TournoiDialogComponent} from '../tournoi/tournoi-dialog/tournoi-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {School} from '../models/school';
import {SchoolDialogComponent} from './school-dialog/school-dialog.component';

const OPTIONS =  [

  {name: 'Ecole mini tennis', link: ['#']},

]

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.css']
})
export class SchoolsComponent implements OnInit {
  schools= [];
  options = OPTIONS;
  length: number;
  httpParams: any;
  pageIndex: number = 0;
  constructor(public dialog: MatDialog,
              private _snackBar: MatSnackBar,) { }

  setPageOptions($event: PageEvent) {
    this.httpParams.page_size = $event.pageSize;
    this.httpParams.page = $event.pageIndex + 1;
    this.fetchData();
  }

  ngOnInit(): void {
  }

  private fetchData() {

  }

  openDialog(e?: School) {
    if (e==undefined) e = new School();
    const dialogRef = this.dialog.open(SchoolDialogComponent, {
      width: '850px',
      panelClass: 'panel-dialog',
      data: {school: e}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        switch (result) {
          case 'add': {
            this.fetchData();
            this.openSnackBar('L\'école  a été ajouté avec succès.' ,'Ok');
            break;
          }
          case 'update': {
            this.fetchData();
            this.openSnackBar('L\'école  a été modifié avec succès.' ,'Ok');
            break;
          }
        }
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
