import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {Membre} from '../models/membre';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MembreService} from '../services/membre.service';
import {CotisationService} from '../services/cotisation.service';
import {MatPaginatorIntl, PageEvent} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {AddMembreComponent} from '../membre/add-membre/add-membre.component';

@Component({
  selector: 'app-entraineur',
  templateUrl: './entraineur.component.html',
  styleUrls: ['./entraineur.component.css']
})
export class EntraineurComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nom', 'tel', 'E-mail', 'actions'];
  entraineurs$: Observable<any>;
  entraineurs: Array<Membre>;
  length: number;
  httpParams: any;
  pageIndex: number = 0;
  dataSource = new MatTableDataSource<Membre>([]);
  private _hide: boolean = true;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private membreService: MembreService,
    private matPaginator: MatPaginatorIntl,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router:Router) {
  }



  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.httpParams = {page_size: 10, page: this.pageIndex + 1, entraineur: true};
    this.matPaginator.itemsPerPageLabel = "Elements par page:";
    this.matPaginator.nextPageLabel = "Page suivante";
    this.matPaginator.previousPageLabel = "Page précédente";
    this.matPaginator.firstPageLabel = "Première Page";
    this.matPaginator.lastPageLabel = "Dernière Page";
    this.fetchData();
  }

  fetchData() {
    this.entraineurs$ = this.membreService.getAllByPage(this.httpParams);
    this.entraineurs$.subscribe(
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
      membre.entraineur = true;
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
          this.membreService.create(membre).subscribe(value => {
            console.log(value);
            this.openSnackBar('Membre a été ajouté avec succès', 'Ok')
            this.fetchData();
          })
          break;
        }
        case 'modify': {
          this.membreService.update(membre.id, membre).subscribe(value => {
            console.log(value);
            this.openSnackBar('Membre a été modifié avec succès', 'Ok')
            this.fetchData();
          })
          break;
        }
        case 'delete': {
          this.deleteEntraineur(membre);
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

  deleteEntraineur(membre: Membre) {
    this.membreService.delete(membre.id).subscribe(value => {
      console.log(value);
      this.openSnackBar('Entraineur a été supprimé avec succès', 'Ok')
      this.fetchData();
    })
  }

}
