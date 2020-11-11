import { Component, OnInit } from '@angular/core';
import {MembreComponent} from '../../membre/membre.component';
import {MembreService} from '../../services/membre.service';
import {CotisationService} from '../../services/cotisation.service';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ExcelService} from '../../services/excel.service';
import {Membre} from '../../models/membre';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-member-school',
  templateUrl: './member-school.component.html',
  styleUrls: ['./member-school.component.css']
})
export class MemberSchoolComponent extends MembreComponent {
  displayedColumns: string[] = ['id', 'nom', 'tel', 'E-mail','age', 'date_naissance',
    'cat','cot', 'paye','montant', 'reste', 'date_paiement', 'Assurance', 'actions'];

  // constructor(
  //   protected membreService: MembreService,
  //   protected cotisationService: CotisationService,
  //   protected matPaginator: MatPaginatorIntl,
  //   protected _snackBar: MatSnackBar,
  //   public dialog: MatDialog,
  //   public router:Router,
  //   public activatedRoute:ActivatedRoute,
  //   protected excelService:ExcelService
  // ) {
  //   super(membreService,
  //     cotisationService,
  //     matPaginator,
  //     _snackBar,
  //     dialog,
  //     router,
  //     activatedRoute,
  //     excelService);
  // }

  setParams() {
    this.membres$ = this.activatedRoute.paramMap.pipe(switchMap((params: ParamMap)=> {
      let school = params.get('school');
      this.httpParams = {page_size: 10, page: this.pageIndex + 1, entraineur: false, school: parseInt(school)};
      return this.membreService.getAllByPage(this.httpParams);
    }))
    // let school = this.activatedRoute.snapshot.paramMap.get('school');
    // this.httpParams = {page_size: 10, page: this.pageIndex + 1, entraineur: false, school: parseInt(school)};
  }

  fetchData() {
    // this.membres$ = this.membreService.getAllByPage(this.httpParams);
    this.membres$.subscribe(
      value => {
        // this.dataSource = new MatTableDataSource(value.results);
        this.dataSource.data = value.results;
        // this.membres = value.results;
        this.length = value.count;
      });
  }

  opendialog(edit = false, membre?: Membre) {
    if (membre == null) {
      membre = new Membre();
    }
    let params = <any>{school: true};
    if (edit)
      params = {id: membre.id, school: true};
    this.router.navigate(['/admin/membre', params]);
  }
}
