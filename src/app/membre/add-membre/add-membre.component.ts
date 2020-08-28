import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-membre',
  templateUrl: './add-membre.component.html',
  styleUrls: ['./add-membre.component.css']
})
export class AddMembreComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddMembreComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(value: any) {
    this.dialogRef.close(this.data)
  }
}
