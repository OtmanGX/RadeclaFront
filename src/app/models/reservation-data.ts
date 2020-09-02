export class ReservationData {
  id: number;
  terrain: any;
  start_date : Date;
  end_date : Date;
  membre1 : any = null;
  membre2 : any = null;
  membre3 : any = null;
  membre4 : any = null;
  eclairage : boolean = false;
  eclairage_paye : boolean = false;
  entrainement : boolean = false;
  constructor() {
  }
}
