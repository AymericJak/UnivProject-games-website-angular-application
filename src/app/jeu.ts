import {Categorie} from "./categorie";
import {Theme} from "./theme";
import {Editeur} from "./editeur";

export interface Jeu {
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
  categorie: Categorie,
  theme: Theme,
  editeur: Editeur
}
