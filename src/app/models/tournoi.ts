export class Tournoi {
  id: number;
  name: string;
  players:Array<any> = [];
  created_date: Date;
  date: Date;
  type_tournoi = 'TCMT';
  juges: string;
  director: string;
  trainers: string;
}
