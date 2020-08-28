export class ReservationData {
  id: number;
  terrain: number;
  start_date : Date;
  end_date : Date;
  membre1 : number = null;
  membre2 : number = null;
  membre3 : number = null;
  membre4 : number = null;
  eclairage : boolean = false;
  eclairage_paye : boolean = false;
  entrainement : boolean = false;
  constructor() {
  }
}
