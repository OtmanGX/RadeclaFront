export class ReservationData {
  id: number;
  terrain: number;
  start_date : Date;
  end_date : Date;
  nom1 : string;
  prenom1 : string;
  nom2 : string;
  prenom2 : string;
  nom3 : string;
  prenom3 : string;
  nom4 : string;
  prenom4 : string;
  eclairage : boolean = false;
  eclairage_paye : boolean = false;
  entrainement : boolean = false;
  constructor() {
  }
}
