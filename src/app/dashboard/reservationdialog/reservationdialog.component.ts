import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ReservationData} from '../../models/reservation-data';
import {ReservationService} from '../../services/reservation.service';
import {forkJoin, Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {map, startWith, tap} from 'rxjs/operators';
import {MembreService} from '../../services/membre.service';
import {Membre} from '../../models/membre';
// Calendar
import {
  isSameDay,
  addHours,
  addDays,
  isAfter,
  isBefore,
} from 'date-fns';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TournamentService} from '../../services/tournament.service';

@Component({
  selector: 'app-reservationdialog',
  templateUrl: './reservationdialog.component.html',
  styleUrls: ['./reservationdialog.component.css']
})
export class ReservationdialogComponent implements OnInit{

  editable = true;
  eclairage = false;
  // options:string[];
  filteredOptions: Observable<string[]>;
  filteredOptions2: Observable<string[]>;
  filteredOptions3: Observable<string[]>;
  filteredOptions4: Observable<string[]>;
  myControl = new FormControl();
  myControl2 = new FormControl();
  myControl3 = new FormControl();
  myControl4 = new FormControl();

  // members
  membres: Membre[];
  member1Verified = false;
  member2Verified = false;
  member3Verified = false;
  member4Verified = false;
  member1 = new Membre();
  member2 = new Membre();
  member3 = new Membre();
  member4 = new Membre();

  tournois$;

  constructor(
    public dialogRef: MatDialogRef<ReservationdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private resService:ReservationService,
    private memService:MembreService,
    private tournamentService:TournamentService,
    private _snackBar: MatSnackBar,
    ) {
  }

  ngOnInit(): void {
    this.tournois$ = this.tournamentService.getAll({all: true});
    if (this.data.edit) {
      console.log("edit");
      this.editable = isAfter(new Date(), addDays(new Date(this.data.reservation.start_date), 1));
    }
    this.memService.getAllByPage({all:true}).subscribe(value => {
      this.membres = value;
      this.setFiltering();
      if (this.data.edit) {
          if (this.data.reservation.tournoi !== null) {
            console.log('not null');
            this.data.reservation.tournoi = this.data.reservation.tournoi.id;
          }
        if (this.data.reservation.players.length == 2) {
          if (this.data.reservation.players[0] !== null) {
            this.member1Verified = true;
            this.member1 = this.getMember(this.data.reservation.players[0].id);
          }
          if (this.data.reservation.players[1] !== null) {
            console.log("membre3 not null");
            this.member3Verified = true;
            this.member3 = this.getMember(this.data.reservation.players[1].id);
          }
        } else {
          if (this.data.reservation.players[0] !== null) {
            this.member1Verified = true;
            this.member1 = this.getMember(this.data.reservation.players[0].id);
          }
          if (this.data.reservation.players[1] !== null) {
            console.log("membre2 not null");
            this.member2Verified = true;
            this.member2 = this.getMember(this.data.reservation.players[1].id);
          }
          if (this.data.reservation.players[2] !== null) {
            console.log("membre3 not null");
            this.member3Verified = true;
            this.member3 = this.getMember(this.data.reservation.players[2].id);
          }
          if (this.data.reservation.players[3] != null) {
            console.log("membre4 not null");
            this.member4Verified = true;
            this.member4 = this.getMember(this.data.reservation.players[3].id);
          }
        }
    }

    })

  }

  setFiltering() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.filteredOptions2 = this.myControl2.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.filteredOptions3 = this.myControl3.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.filteredOptions4 = this.myControl4.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.membres.map(value1 => value1.nom).filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  getMember(num:number): Membre {
    for (let m of this.membres){
      if (m.id === num)
      {
        return m;
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  isNight() {
    let d = new Date(this.data.reservation.start_date);
    return d.getHours() >= 17;
  }

  submit(value: any) {
    if (this.data.action != undefined) {
      switch (this.data.action) {
        case 'add':
          value.start_date = this.data.reservation.start_date;
          value.duration = 1;
          // value.end_date = this.data.reservation.end_date;
          // value.end_date = new Date(value.start_date);
          // value.end_date.setMinutes(value.end_date.getMinutes() + 59);
          let calls = this.membresProcessing(value);
          if (calls.length)
            forkJoin(calls).subscribe(allResults => {
              this.resService.create(value).subscribe((result) => this.dialogRef.close(this.data),
                  error => this.openSnackBar(error.error?.non_field_errors, 'Ok'));
            });
          else this.resService.create(value).subscribe((result) => this.dialogRef.close(this.data),
              error => this.openSnackBar(error.error?.non_field_errors, 'Ok'));
          break;
        case 'modify':
          value.start_date = this.data.reservation.start_date;
          value.end_date = this.data.reservation.end_date;
          let calls2 = this.membresProcessing(value);
          if (calls2.length)
            forkJoin(calls2).subscribe(allResults => {
              this.resService.update(this.data.reservation.id, value).subscribe((result) => this.dialogRef.close(this.data),
                  error => this.openSnackBar(error, 'Ok'));
            });
          else this.resService.update(this.data.reservation.id, value).subscribe((result) => this.dialogRef.close(this.data),
              error => this.openSnackBar(error, 'Ok'));
          break;
        case 'delete':
          console.log('delete');
          this.resService.delete(this.data.reservation.id)
            .subscribe((result) => this.dialogRef.close(this.data), error => console.log(error))
          break;
      }
      // this.dialogRef.close(this.data);
      // console.log(value);
    }
  }

  membresProcessing(value: any) {
    let calls = [];
    value.players = []
    if (this.member1Verified)
    value.players.push(this.getMembreId(this.member1.nom));
    else if (this.member1.nom != undefined && this.member1.nom !== '')
      calls.push(this.memService.create(this.member1).pipe(tap(res => value.players.push((<Membre>res).id))));
    if (this.member3Verified)
      value.players.push(this.getMembreId(this.member3.nom));
    else if (this.member3.nom != undefined && this.member3.nom !== '')
      calls.push(this.memService.create(this.member3).pipe(tap(res => value.players.push((<Membre>res).id))));
    if (this.member2Verified)
      value.players.push(this.getMembreId(this.member2.nom));
    else if (this.member2.nom != undefined && this.member2.nom !== '')
      calls.push(this.memService.create(this.member2).pipe(tap(res => value.players.push((<Membre>res).id))));
    if (this.member4Verified)
      value.players.push(this.getMembreId(this.member4.nom));
    else if (this.member4.nom != undefined && this.member4.nom !== '')
      calls.push(this.memService.create(this.member4).pipe(tap(res => value.players.push((<Membre>res).id))));
    return calls;
    }

  getMembreId(nom:String): number {
    let res = null;
    for (let elem of this.membres)
      if (elem.nom === nom){
        res = elem.id;
        break;
      }
    return res;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  // changed($event: any, f) {
  //   console.log($event);
  //   f.membre1 = $event;
  // }

  // showSelected($event: MatOptionSelectionChange) {
  //   console.log($event.source.value);
  //   this.member3Verified = true;
  // }
}
