import {Component, OnInit, ViewChild} from '@angular/core';
import {MembreService} from '../services/membre.service';
import {Observable} from 'rxjs';
import {MatPaginatorIntl, PageEvent} from '@angular/material/paginator';
import {ReservationdialogComponent} from '../dashboard/reservationdialog/reservationdialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ReservationService} from '../services/reservation.service';
import {AddMembreComponent} from './add-membre/add-membre.component';
import {Membre} from '../models/membre';
import {exitCodeFromResult} from '@angular/compiler-cli';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-membre',
  templateUrl: './membre.component.html',
  styleUrls: ['./membre.component.css']
})
export class MembreComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nom', 'tel', 'E-mail', 'actions'];
  membres$: Observable<any>;
  membres: Array<Membre>;
  length: number;
  httpParams: any;
  pageIndex: number = 0;
  dataSource = new MatTableDataSource<Membre>([]);
  private _hide: boolean = true;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private service: MembreService,
              private matPaginator: MatPaginatorIntl,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }



  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.httpParams = {page_size: 10, page: this.pageIndex + 1};
    this.matPaginator.itemsPerPageLabel = "Elements par page:";
    this.matPaginator.nextPageLabel = "Page suivante";
    this.matPaginator.previousPageLabel = "Page précédente";
    this.fetchData();
  }

  fetchData() {
    this.membres$ = this.service.getAllByPage(this.httpParams);
    this.membres$.subscribe(
      value => {
        // this.dataSource = new MatTableDataSource(value.results);
        this.dataSource.data = value.results;
        // this.membres = value.results;
        this.length = value.count;
      });
  }

  setPageOptions($event: PageEvent) {
    console.log("setPageOptions Called");
    this.httpParams.page_size = $event.pageSize;
    this.httpParams.page = $event.pageIndex + 1;
    this.fetchData();
  }


  get hide(): boolean {
    return this._hide;
  }

  set hide(value: boolean) {
    this._hide = value;
    if (value) {
      delete this.httpParams.search;
      this.httpParams.page = 1;
      this.pageIndex = 0;
      this.fetchData();
    }
  }

  search(value: string) {
    this.hide = false;
    this.httpParams.page = 1;
    this.pageIndex = 0;
    this.httpParams.search = value;
    this.fetchData();
  }

  opendialog(edit = false, membre?: Membre) {
    if (membre == null) {
      membre = new Membre();
    }
    const dialogRef = this.dialog.open(AddMembreComponent, {
      width: '850px',
      panelClass: 'panel-dialog',
      data: {membre: membre, edit: edit},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == null) return;
      switch (result.action) {
        case 'add':{
          this.service.create(membre).subscribe(value => {
            console.log(value);
            this.openSnackBar('Membre a été ajouté avec succès', 'Ok')
            this.fetchData();
          })
          break;
        }
        case 'modify': {
          this.service.update(membre.id, membre).subscribe(value => {
            console.log(value);
            this.openSnackBar('Membre a été modifié avec succès', 'Ok')
            this.fetchData();
          })
          break;
        }
        case 'delete': {
          this.deleteMembre(membre.id);
          break;
        }
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  deleteMembre(id:number) {
    this.service.delete(id).subscribe(value => {
      console.log(value);
      this.openSnackBar('Membre a été supprimé avec succès', 'Ok')
      this.fetchData();
    })
  }
}
