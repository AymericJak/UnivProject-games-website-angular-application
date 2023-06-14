import {CategorieRequest} from "./categorieRequest";
import {ThemeRequest} from "./themeRequest";
import {EditeurRequest} from "./editeurRequest";
import {CommentaireRequest} from "./commentaireRequest";
import {Jeu} from "../jeu";
import {AchatRequest} from "./achat-request";

export interface JeuRequest {
  status: string,
  message: string,
  achats: AchatRequest[],
  commentaires: CommentaireRequest[],
  jeu: Jeu,
  nb_likes: number,
  note_moyenne: number
}
