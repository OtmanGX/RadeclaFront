import { Component, OnInit } from '@angular/core';
import {MembreComponent} from '../../membre/membre.component';
import {MembreService} from '../../services/membre.service';
import {CotisationService} from '../../services/cotisation.service';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {ExcelService} from '../../services/excel.service';

@Component({
  selector: 'app-member-school',
  templateUrl: './member-school.component.html',
  styleUrls: ['./member-school.component.css']
})
export class MemberSchoolComponent extends MembreComponent {
  displayedColumns: string[] = ['id', 'nom', 'tel', 'E-mail','age', 'date_naissance',
    'cat','cot', 'paye','montant', 'reste', 'date_paiement', 'Assurance', 'actions'];

  constructor(
    public membreService: MembreService,
    public cotisationService: CotisationService,
    public matPaginator: MatPaginatorIntl,
    public _snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router:Router,
    public activatedRoute:ActivatedRoute,
    public excelService:ExcelService
  ) {
    super(membreService,
      cotisationService,
      matPaginator,
      _snackBar,
      dialog,
      router,
      activatedRoute,
      excelService);
  }

  setParams() {
    super.setParams();
    let school = this.activatedRoute.snapshot.paramMap.get('school');
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
}
