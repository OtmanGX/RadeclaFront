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
import {ActivatedRoute, Route, Router} from '@angular/router';
import {CotisationService} from '../services/cotisation.service';
import {ExcelService} from '../services/excel.service';

@Component({
  selector: 'app-membre',
  templateUrl: './membre.component.html',
  styleUrls: ['./membre.component.css']
})
export class MembreComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nom', 'tel', 'E-mail','age', 'date_naissance', 'profession',
    'tournoi', 'cat','cot', 'paye','montant', 'reste', 'date_paiement','licence fédération', 'Assurance', 'actions'];
  membres$: Observable<any>;
  membres: Array<Membre>;
  length: number;
  httpParams: any;
  pageIndex: number = 0;
  dataSource = new MatTableDataSource<Membre>([]);
  private _hide: boolean = true;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
              private membreService: MembreService,
              private cotisationService: CotisationService,
              private matPaginator: MatPaginatorIntl,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog,
              public router:Router,
              public activatedRoute:ActivatedRoute,
              private excelService:ExcelService
              ) {
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.httpParams = {page_size: 10, page: this.pageIndex + 1, entraineur: false, cotisation:'', cotisation__paye:'', cotisation__isnull:'', tournoi:''};
    let filter = this.activatedRoute.snapshot.paramMap.get('cotisation__paye');
    if (filter) this.httpParams.cotisation__paye = filter;
    if (this.activatedRoute.snapshot.paramMap.get('tournoi'))
      this.httpParams.tournoi = true;
    this.matPaginator.itemsPerPageLabel = "Elements par page:";
    this.matPaginator.nextPageLabel = "Page suivante";
    this.matPaginator.previousPageLabel = "Page précédente";
    this.matPaginator.firstPageLabel = "Première Page";
    this.matPaginator.lastPageLabel = "Dernière Page";
    this.fetchData();
  }

  exportAsXLSX(data):void {
    this.excelService.exportAsExcelFile(data, 'membres');
  }

  fetchData() {
    this.membres$ = this.membreService.getAllByPage(this.httpParams);
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
    let params = {};
    if (edit)
        params = {id: membre.id};
    // if (edit) {
    //   if (membre.cotisation?.type === "individuel")
    //   {
    //     params = {id: membre.id};
    //     this.router.navigate(['/admin/membre', params]);
    //   } else {
    //     params = {id: membre.cotisation.id};
    //     this.router.navigate(['/admin/groupe', params]);
    //   }
    // }
    this.router.navigate(['/admin/membre', params]);
  }

  addgroup() {

  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  deleteMembre(membre: Membre) {
    this.membreService.delete(membre.id).subscribe(value => {
      console.log(value);
      this.openSnackBar('Membre a été supprimé avec succès', 'Ok')
      this.fetchData();
      this.cotisationService.delete(membre.cotisation.id).subscribe();
    })
  }
}
