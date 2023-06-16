import {CommentaireRequest} from "./commentaireRequest";
import {Jeu} from "../jeu";
import {AchatRequest} from "./achat-request";

export interface JeuRequest {
  image_enc: string;
  status: string,
  message: string,
  achats: AchatRequest[],
  commentaires: CommentaireRequest[],
  jeu: Jeu,
  nb_likes: number,
  note_moyenne: number,
  prix_moyen: number
}
