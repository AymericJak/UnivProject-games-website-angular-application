import {CategorieRequest} from "./categorieRequest";
import {ThemeRequest} from "./themeRequest";
import {EditeurRequest} from "./editeurRequest";
import {CommentaireRequest} from "./commentaireRequest";

export interface JeuRequest {
  id: number,
  nom: string,
  description: string,
  langue: string,
  url_media: string,
  age_min: number,
  nombre_joueurs_min: number,
  nombre_joueurs_max: number,
  duree_partie: number,
  valide: boolean,
  nb_likes: number,
  note_moyenne: number;
  categorie: CategorieRequest,
  commentaires: CommentaireRequest[]
  theme: ThemeRequest,
  editeur: EditeurRequest
}
