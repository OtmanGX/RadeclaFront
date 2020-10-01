import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {environment} from '../../environments/environment';
import {ActivatedRoute, Route, Router} from '@angular/router';

const OPTIONS =  [

  {name: 'Liste des adhérants', link: ['/admin/membres']},
  {name: "Liste des adhérants qui n'ont toujours pas payé la cotisation", link: ['/admin/membres', {cotisation__paye: false}]},
  {name: "Total cotisation année 2020", link: ['/admin/totalcotisation']},
  {name: "Total cotisation à payer", link: ['/admin/cotisationtopay']},
  {name: "Taux d'occupation des terrains", link: ['/admin/tauxTerrains']},
  {name: "Les heures les plus demandées", link: ['/admin/hours']},
  {name: "Durée d'entrainement", link: ['/admin/training']},
  {name: "Nombre d'heures jouées par adhérant", link: ['/admin/membresStats']},

]
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  options = OPTIONS;
  constructor(pageTitle :Title,
              public route: Router) {
    pageTitle.setTitle(environment.title + ' | Historique');
    if (this.route.url.endsWith('history')) {
      this.options =  [

        {name: 'Adhérants', link: ['/admin/history/adherants']},
        {name: 'Terrains', link: ['/admin/history/terrains']},
        {name: 'Entraineurs', link: ['/admin/history/entraineurs']},
        {name: 'Cotisations', link: ['/admin/history/cotisations']},
        {name: 'Matches', link: ['#']},
        {name: 'Tournois', link: ['#']},
        {name: 'Vide', link: ['#']},
        {name: 'Vide', link: ['#']},

      ]
    } else  if (this.route.url.endsWith('adherants')) {
        this.options = [
          {name: 'Liste des adhérants', link: ['/admin/membres']},
          {name: "Liste des adhérants à jour de leurs cotisations", link: ['/admin/membres', {cotisation__paye: false}]},
          {name: "Liste des adhérants non à jour de leurs cotisations", link: ['/admin/membres', {cotisation__paye: false}]},
          {name: "Nombre d'heures jouées par adhérant", link: ['/admin/membresStats']},
          {name: "Nombre d'heures de match jouées par adhérant", link: ['/admin/membresStats']},
          {name: "Adhérants qui participent aux tournois", link: ['#']},
          {name: "Vide", link: ['#']},
          {name: "Vide", link: ['#']},
          {name: "Vide", link: ['#']},
        ]
    } else  if (this.route.url.endsWith('terrains')) {
        this.options = [
          {name: "Taux d'occupation de chaque terrain", link: ['/admin/tauxTerrains']},
          {name: "Taux d'occupation des terrains par jour", link: ['/admin/tauxTerrains']},
          {name: "Taux d'occupation des terrains par semaine", link: ['/admin/tauxTerrains']},
          {name: "Taux d'occupation des terrains par mois", link: ['/admin/tauxTerrains']},
          {name: "Les heures les plus demandées générales et par tranche d'âge", link: ['/admin/hours']},
          {name: "Vide", link: ['#']},
          {name: "Vide", link: ['#']},
          {name: "Vide", link: ['#']},
        ]
    } else  if (this.route.url.endsWith('entraineurs')) {
        this.options = [
          {name: "Liste des entraineurs", link: ['/admin/entraineur']},
          {name: "Durée d'entrainements", link: ['/admin/training']},
          {name: "Total entrainements par jour", link: ['/admin/training']},
          {name: "Total entrainements par semaine", link: ['/admin/training']},
          {name: "Total entrainements par mois", link: ['/admin/training']},
          {name: "Vide", link: ['#']},
          {name: "Vide", link: ['#']},
          {name: "Vide", link: ['#']},
        ]
    } else  if (this.route.url.endsWith('cotisations')) {
        this.options = [
          {name: "Total cotisations année en cours", link: ['/admin/totalcotisation']},
          {name: "Total des cotisations qui restent à payer", link: ['/admin/cotisationtopay']},
          {name: "Liste des adhérants à jour de leurs cotisations", link: ['/admin/membres', {cotisation__paye: true}]},
          {name: "Liste des adhérants non à jour de leurs cotisations", link: ['/admin/membres', {cotisation__paye: false}]},
          {name: "Vide", link: ['#']},
          {name: "Vide", link: ['#']},
          {name: "Vide", link: ['#']},
          {name: "Vide", link: ['#']},
        ]
    }
  }

  ngOnInit(): void {
  }

}
