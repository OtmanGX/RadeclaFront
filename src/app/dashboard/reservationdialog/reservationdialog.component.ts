import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ReservationData} from '../../models/reservation-data';
import {ReservationService} from '../../services/reservation.service';

@Component({
  selector: 'app-reservationdialog',
  templateUrl: './reservationdialog.component.html',
  styleUrls: ['./reservationdialog.component.css']
})
export class ReservationdialogComponent {

  eclairage = false;
  constructor(
    public dialogRef: MatDialogRef<ReservationdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service:ReservationService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(value: any) {
    if (this.data.action != undefined) {
      switch (this.data.action) {
        case 'add':
          value.start_date = this.data.reservation.start_date;
          value.end_date = this.data.reservation.end_date;
          // value.end_date = new Date(value.start_date);
          // value.end_date.setMinutes(value.end_date.getMinutes() + 59);
          this.service.create(value).subscribe((result) => console.log(result));
          break;
        case 'modify':
          value.start_date = this.data.reservation.start_date;
          value.end_date = this.data.reservation.end_date;
          this.service.update(this.data.reservation.id, value).subscribe((result) => console.log(result));
          break;
        case 'delete':
          console.log('delete');
          this.service.delete(this.data.reservation.id)
            .subscribe((result) => console.log(result), error => console.log(error))
          break;
      }
      this.dialogRef.close(this.data);
      // console.log(value);
    }
  }
}
