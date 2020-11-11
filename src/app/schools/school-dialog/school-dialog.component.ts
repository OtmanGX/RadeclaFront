import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SchoolService} from '../../services/school.service';
import {School} from '../../models/school';

@Component({
  selector: 'app-school-dialog',
  templateUrl: './school-dialog.component.html',
  styleUrls: ['./school-dialog.component.css']
})
export class SchoolDialogComponent implements OnInit {
  public school: School;

  constructor(public dialogRef: MatDialogRef<SchoolDialogComponent>,
              private schoolService :SchoolService,
              @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.school = data.school;
  }
  ngOnInit(): void {
  }

  submit(value: any) {
    console.log(value);
    if (this.school.id!=undefined) {
      console.log('update');
      this.schoolService.update(this.school.id, this.school).subscribe(value1 => {
        console.log(value1);
        this.dialogRef.close('update');
      });
    }
    else this.schoolService.create(this.school).subscribe(value1 => {
      console.log(value1);
      this.dialogRef.close('add');
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
