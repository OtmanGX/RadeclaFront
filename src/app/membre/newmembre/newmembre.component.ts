import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MembreService} from '../../services/membre.service';
import {Membre} from '../../models/membre';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CotisationService} from '../../services/cotisation.service';
import {forkJoin} from 'rxjs';
import {Location} from '@angular/common';
// Tree
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {SchoolService} from '../../services/school.service';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Membres de la même cotisation',
    children: [
    ]
  }
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-newmembre',
  templateUrl: './newmembre.component.html',
  styleUrls: ['./newmembre.component.css']
})
export class NewmembreComponent implements OnInit {

  @ViewChild('cotisation') isCotisation;
  today = new Date();
  memberId;
  member;
  from_school: boolean = false;
  schools$;
  membreCotisation = null;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  categories = ['11ans', '12ans', '13-14 ans', '7-10 ans', 'Grade 1', 'Grade 2', 'Grade 3', 'Vétéran +35', 'Vétéran +45'];

  // Tree Section
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  constructor(
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private _location: Location,
              private membreService: MembreService,
              private cotisationService: CotisationService,
              private schoolService: SchoolService,
              private _formBuilder: FormBuilder,
              private _snackBar: MatSnackBar) {

    this.memberId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.activatedRoute.snapshot.paramMap.has('school')) {
      this.from_school = true;
      this.schools$ = this.schoolService.getAll({lite: true});
    }
  }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;


  ngOnInit(): void {
    this.secondFormGroup = this._formBuilder.group({
      _type: new FormControl({value: 'individuel', disabled: true}),
      type: new FormControl({value: 'individuel', disabled: false}),
      paye: [false, Validators.required],
      montant: [null],
      montant_paye: [null],
      membres: [''],
    });
    if (this.memberId) this.membreService.get(this.memberId).subscribe(value => {
      let membre = <Membre>value;
      this.member = membre;
      if (membre.cotisation)
        this.cotisationService.get(membre.cotisation.id).subscribe(value =>
        {
          console.log(value);
          this.membreCotisation = value;
          console.log(this.membreCotisation);
          if (membre.cotisation?.type !== "individuel")
          {
            this.membreCotisation.membres.forEach(elem => TREE_DATA[0].children.push({name: elem}))
            this.dataSource.data = TREE_DATA; // Tree
            console.log(TREE_DATA);
          }
          this.secondFormGroup = this._formBuilder.group({
            _type: new FormControl({value: membre.cotisation.type, disabled: true}),
            type: new FormControl({value: membre.cotisation.type, disabled: false}),
            paye: [membre.cotisation.paye, Validators.required],
            id: [membre.cotisation.id],
            montant_paye: [membre.cotisation.montant_paye],
            montant: [membre.cotisation.montant],
            membres: [this.membreCotisation.membres],
          });

        }); else this.membreCotisation = membre.cotisation;
      this.firstFormGroup = this._formBuilder.group({
        nom: [membre.nom, Validators.required],
        sexe: [membre.sexe, Validators.required],
        tel: [membre.tel],
        mail: [membre.mail],
        date_naissance: [membre.date_naissance],
        age: [membre.age],
        licence_fideration: [membre.licence_fideration],
        tournoi: [membre.tournoi],
        profession: [membre.profession],
        entraineur: [membre.entraineur],
        categorie: [membre.categorie],
        school: this.from_school?[membre.school, Validators.required]:[null],
      });
    });
    else
      this.firstFormGroup = this._formBuilder.group({
        nom: ['', Validators.required],
        sexe: ['H', Validators.required],
        tel: [''],
        mail: [''],
        date_naissance: [null],
        age: [null],
        categorie: [[]],
        tournoi: [false],
        entraineur: [false],
        profession: [null],
        licence_fideration: [false],
        school: this.from_school?[null, Validators.required]:[null],
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  submit() {
        console.log(this.firstFormGroup.value);
        let birthday = this.firstFormGroup.get('date_naissance').value;
        if (this.firstFormGroup.get('age').value == "")
          this.firstFormGroup.patchValue({age: null});
        if (birthday == "")
          this.firstFormGroup.patchValue({date_naissance: null});
        // else {
        //   birthday = (<Date>this.firstFormGroup.get('date_naissance').value).toISOString();
        //   console.log(birthday);
        //   this.firstFormGroup.patchValue({'date_naissance': '2020-10-23'});
        // }

        if (this.memberId) {
          let calls = [this.membreService.update(this.memberId, this.firstFormGroup.value)];
          if (this.member.cotisation ) calls.push(this.cotisationService.patch(this.secondFormGroup.get("id").value, this.secondFormGroup.value));
          else if (this.isCotisation.checked) {
            this.secondFormGroup.patchValue({membres: [this.firstFormGroup.get('nom').value]});
            calls.push(this.cotisationService.create(this.secondFormGroup.value));
          }
          forkJoin(calls)
            .subscribe(() => {
              this.openSnackBar('Membre a été modifié avec succès', 'Ok');
              // this.router.navigate([this.from_school?'admin/membreSchools':'admin/membres']);
              this.backClicked();
            })
        } else if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
          this.membreService.create(this.firstFormGroup.value).subscribe(value => {
            console.log(value);
            if (this.isCotisation.checked) {
              this.secondFormGroup.patchValue({membres: [this.firstFormGroup.get('nom').value]});
              console.log(this.secondFormGroup.value);
              this.cotisationService.create(this.secondFormGroup.value).subscribe(() => {
                this.openSnackBar('Membre a été ajouté avec succès', 'Ok');
                // this.router.navigate([this.from_school?'admin/membreSchools':'admin/membres']);
                this.backClicked();
              });
            } else this.backClicked();
              // this.router.navigate([this.from_school?'admin/membreSchools':'admin/membres']);
          })
        }
  }

  backClicked() {
    this._location.back();
  }

  is_paye(state: boolean) {
    if (state)
      this.secondFormGroup.patchValue({'montant_paye': this.secondFormGroup.get('montant').value})
  }
}
