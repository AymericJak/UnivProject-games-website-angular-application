import {JeuRequest} from "./jeuRequest";

export interface CommentaireRequest {
  id: number,
  commentaire: string,
  date_com: Date,
  note: number,
  etat: string,
  jeu: JeuRequest
}
