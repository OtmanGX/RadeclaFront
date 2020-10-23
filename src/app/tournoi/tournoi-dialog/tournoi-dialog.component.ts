import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {MembreService} from '../../services/membre.service';
import {TournamentService} from '../../services/tournament.service';
import {Tournoi} from '../../models/tournoi';
import {MatOptionSelectionChange} from '@angular/material/core';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-tournoi-dialog',
  templateUrl: './tournoi-dialog.component.html',
  styleUrls: ['./tournoi-dialog.component.css']
})
export class TournoiDialogComponent implements OnInit {
  membres$;
  filterMembres$;
  filterMembres2$;
  downloadLink;
  tournoi: Tournoi;
  constructor(public dialogRef: MatDialogRef<TournoiDialogComponent>,
              private membreService :MembreService,
              private tournamentService :TournamentService,
              @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.tournoi = data.tournoi;
    this.downloadLink = environment.apiUrl + '/download/tournoi'
  }

  ngOnInit(): void {
    this.membres$ = this.membreService.getAll({all: true, entraineur: false, ordering: 'nom'});
  }

  submit(value: any) {
    console.log(value);
    if (this.tournoi.id!=undefined) {
      console.log('update');
      this.tournamentService.update(this.tournoi.id, this.tournoi).subscribe(value1 => {
        console.log(value1);
        this.dialogRef.close('update');
      });
    }
    else this.tournamentService.create(this.tournoi).subscribe(value1 => {
      console.log(value1);
      this.dialogRef.close('add');
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setFiltreMembers(sexe, min: number, max = null) {
    if (max == null) max = '';
    if (sexe === 'H')
      this.filterMembres$ = this.membreService.getAll({all: true, entraineur: false, age_range_min: min, age_range_max: max, ordering: 'nom', sexe: sexe});
    else this.filterMembres2$ = this.membreService.getAll({all: true, entraineur: false, age_range_min: min, age_range_max: max, ordering: 'nom', sexe: sexe});
  }

  addMembre(id) {
    this.tournoi.players.push(id);
  }

  deleteMembre(id) {
    this.tournoi.players = this.tournoi.players.filter((value, index) => value!==id);
  }


  selectChange(event) {
    console.log(event)
      if (event._selected) {
        console.log('add');
        this.addMembre(event._value)
      } else this.deleteMembre(event._value);
      console.log(this.tournoi.players)
  }

  print(event) {
    console.log(event)
  }

  downloadInitial(sex = 'H', tournament?) {
    let link = this.downloadLink+'?sex='+sex;
    return tournament==undefined?link:link+'&tournoi='+tournament;
  }
}
