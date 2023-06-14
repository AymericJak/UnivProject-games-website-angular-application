import {Jeu} from "./jeu";

export interface Commentaire {
  id: number,
  commentaire: string,
  date_com: Date,
  note: number,
  etat: string,
  jeu: Jeu
}
