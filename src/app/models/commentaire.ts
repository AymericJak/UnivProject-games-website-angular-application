import {UserRequest} from "./UserRequest";
import {JeuRequest} from "./api/jeuRequest";

export interface Commentaire {
  id: number,
  commentaire: string,
  date_com: string,
  note: number,
  etat: string,
  user_id: UserRequest,
  jeu_id: JeuRequest,
  created_at: string,
  updated_at: string
}
