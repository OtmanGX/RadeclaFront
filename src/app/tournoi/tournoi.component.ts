import { Component, OnInit } from '@angular/core';
import {MatPaginatorIntl, PageEvent} from '@angular/material/paginator';
import {ReservationdialogComponent} from '../dashboard/reservationdialog/reservationdialog.component';
import {MatDialog} from '@angular/material/dialog';
import {TournoiDialogComponent} from './tournoi-dialog/tournoi-dialog.component';
import {TournamentService} from '../services/tournament.service';
import {Tournoi} from '../models/tournoi';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-tournoi',
  templateUrl: './tournoi.component.html',
  styleUrls: ['./tournoi.component.css']
})
export class TournoiComponent implements OnInit {

  length: number;
  httpParams: any;
  pageIndex: number = 0;
  tournaments;
  constructor(private matPaginator: MatPaginatorIntl,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              public activatedRoute: ActivatedRoute,
              private tournamentService :TournamentService,) {

    if (this.activatedRoute.snapshot.url[0].path === 'tournoi_tcmt')
    {
      this.httpParams = {page_size: 10, page: this.pageIndex + 1, type_tournoi: 'TCMT'};
    }
    else this.httpParams = {page_size: 10, page: this.pageIndex + 1, type_tournoi: 'FRMT'};



    this.matPaginator.itemsPerPageLabel = "Elements par page:";
    this.matPaginator.nextPageLabel = "Page suivante";
    this.matPaginator.previousPageLabel = "Page précédente";
    this.matPaginator.firstPageLabel = "Première Page";
    this.matPaginator.lastPageLabel = "Dernière Page";
  }

  fetchData() {
    this.tournamentService.getAll(this.httpParams).subscribe(
      (value: any) => {
        // this.dataSource = new MatTableDataSource(value.results);
        // this.membres = value.results;
        this.length = value.count;
        this.tournaments = value.results;
      });
  }

  ngOnInit(): void {
    this.fetchData();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  setPageOptions($event: PageEvent) {
    this.httpParams.page_size = $event.pageSize;
    this.httpParams.page = $event.pageIndex + 1;
    this.fetchData();
  }

  openDialog(t?: Tournoi) {
    if (t==undefined) t = new Tournoi();
    if (this.httpParams.type_tournoi === 'FRMT') t.type_tournoi = 'FRMT';
    const dialogRef = this.dialog.open(TournoiDialogComponent, {
      width: '850px',
      panelClass: 'panel-dialog',
      data: {tournoi: t}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        switch (result) {
          case 'add': {
            this.fetchData();
            this.openSnackBar('Le tournoi  a été ajouté avec succès.' ,'Ok');
            break;
          }
          case 'update': {
            this.fetchData();
            this.openSnackBar('Le tournoi  a été modifié avec succès.' ,'Ok');
            break;
          }
        }
      }
    });
  }

  deleteTournoi(id: number) {
    this.tournamentService.delete(id).subscribe(value => this.fetchData());
    this.openSnackBar('Le tournoi  a été supprimé avec succès.' ,'Ok');
  }
}
