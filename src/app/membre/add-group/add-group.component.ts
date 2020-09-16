import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {MembreService} from '../../services/membre.service';
import {CotisationService} from '../../services/cotisation.service';
import {forkJoin} from 'rxjs';
import {element} from 'protractor';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {
  family = false;
  formGroup: FormGroup;
  firstFormGroups: FormGroup[] = [];
  secondFormGroup: FormGroup;
  categories = ['11ans', '12ans', '13-14 ans', '7-10 ans', 'Grade 1', 'Grade 2', 'Grade 3'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private membreService: MembreService,
    private cotisationService: CotisationService
  ) {
    this.family = this.activatedRoute.snapshot.paramMap.get('type') === "family";
  }

  ngOnInit(): void {
    this.secondFormGroup = this._formBuilder.group({
      _type: new FormControl({value: this.family?'famille':'couple', disabled: true}),
      type: new FormControl({value: this.family?'famille':'couple', disabled: false}),
      paye: [false, Validators.required],
      montant_paye: [null],
      membres: [''],
      reste_paye: [null],
    });
    this.formGroup = this._formBuilder.group({
      formArray: {}
    });
    this.addPersonForm();
    this.addPersonForm();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  submit() {
    this.firstFormGroups.forEach((element) => {
      console.log(element.value);
      if (element.get('age').value == "")
        element.patchValue({age: null});
      if (element.get('date_naissance').value == "")
        element.patchValue({date_naissance: null});
    });


    if (this.formGroup.valid && this.secondFormGroup.valid) {

      let calls = this.firstFormGroups.map((element) => this.membreService.create(element.value));
      forkJoin(calls).subscribe((value => {
        console.log(value);
        this.secondFormGroup.patchValue({membres: this.firstFormGroups.map((element) => element.get('nom').value)});
        console.log(this.secondFormGroup.value);
        this.cotisationService.create(this.secondFormGroup.value).subscribe(() => {
          this.openSnackBar('Membre a été ajouté avec succès', 'Ok');
          this.router.navigate(['admin/membres']);
        });
      }));


    }
  }

  isFormsValid(): boolean {
    console.log('called');
    this.firstFormGroups.forEach((item) => {
      if(!item.valid) return false;
    });
    return true;
  }

  addPersonForm() {
    this.firstFormGroups.push(this._formBuilder.group({
      nom: ['', Validators.required],
      sexe: ['H', Validators.required],
      tel: [''],
      mail: [''],
      date_naissance: [null],
      age: [null],
      categorie: [[]],
      licence_fideration: [false],
    }));
    this.formGroup.setControl("formArray", this._formBuilder.array(this.firstFormGroups));
  }

  deletePersonForm(index: number) {
    this.firstFormGroups.splice(index, 1);
    this.formGroup.setControl("formArray", this._formBuilder.array(this.firstFormGroups));
  }
}
