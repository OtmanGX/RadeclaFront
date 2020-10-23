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
  options :Array<any>= OPTIONS;
  constructor(pageTitle :Title,
              public route: Router) {
    pageTitle.setTitle(environment.title + ' | Historique');
    if (this.route.url.endsWith('history')) {
      this.options =  [

        {name: 'Adhérants', link: ['/admin/history/adherants']},
        {name: 'Terrains', link: ['/admin/history/terrains']},
        {name: 'Entraineurs', link: ['/admin/history/entraineurs']},
        {name: 'Cotisations', link: ['/admin/history/cotisations']},
        {name: 'Matchs', link: ['#']},
        {name: 'Tournois', link: ['#']},
        {name: 'Défis', link: ['#']},
        {name: 'Réservations réalisées en ligne', link: ['/admin/history/online']},
        {name: 'Eclairage', link: ['/admin/history/eclairage']},
        {name: 'Vide', link: ['#']},

      ]
    } else  if (this.route.url.endsWith('adherants')) {
        this.options = [
          {name: 'Liste des adhérants', link: ['/admin/membres']},
          {name: "Liste des adhérants à jour de leurs cotisations", link: ['/admin/membres', {cotisation__paye: true}]},
          {name: "Liste des adhérants non à jour de leurs cotisations", link: ['/admin/membres', {cotisation__paye: false}]},
          {name: "Nombre d'heures jouées par adhérant", link: ['/admin/membresStats']},
          {name: "Nombre d'heures de matchs joués par adhérant", link: ['/admin/membresStats', {match: true}]},
          {name: "Adhérants qui participent aux tournois", link: ['/admin/membres', {tournoi: true}]},
          {name: "Adhérants par catégorie", link: ['']},
          {name: "Classement adhérants par catégorie", link: ['']},
        ]
    } else  if (this.route.url.endsWith('terrains')) {
        this.options = [
          {name: "Taux d'occupation des terrains", link: ['/admin/tauxTerrainsHours']},
          {name: "Taux d'occupation de chaque terrain", link: ['/admin/tauxTerrains']},
          {name: "Taux d'occupation des terrains par jour", link: ['/admin/tauxTerrains', {select: 0}]},
          {name: "Taux d'occupation des terrains par semaine", link: ['/admin/tauxTerrains', {select: 1}]},
          {name: "Taux d'occupation des terrains par mois", link: ['/admin/tauxTerrains', {select: 2}]},
          {name: "Tranches d'heures les plus solicitées", link: ['/admin/hours']},
          {name: "Les heures les plus solicitées par tranche d'âge", link: ['/admin/hours']},
          {name: "Paramètrage ", link: ['/admin/history/props']},
          {name: "Vide", link: ['#']},
          {name: "Vide", link: ['#']},
        ]
    } else  if (this.route.url.endsWith('entraineurs')) {
        this.options = [
          {name: "Liste des entraineurs", link: ['/admin/entraineur']},
          {name: "Durée d'entrainements", link: ['/admin/training']},
          {name: "Total entrainements par semaine", link: ['/admin/training', {select: 0}]},
          {name: "Total entrainements par mois", link: ['/admin/training', {select: 1}]},
          {name: "Total entrainements par année", link: ['/admin/training', {select: 2}]},
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
          {name: "Historique cotisations", link: ['#']},
          {name: "Vide", link: ['#']},
          {name: "Vide", link: ['#']},
          {name: "Vide", link: ['#']},
        ]
    } else  if (this.route.url.endsWith('eclairage')) {
        this.options = [
          {name: "Nombre d'heures d'éclairage par jour", link: ['/admin/lighting', {select: 0}]},
          {name: "Nombre d'heures d'éclairage par mois", link: ['/admin/lighting', {select: 1}]},
          {name: "Nombre d'heures d'éclairage par année", link: ['/admin/lighting', {select: 2}]},
        ]
    }
  }

  ngOnInit(): void {
  }

}
