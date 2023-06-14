import {CategorieRequest} from "./categorieRequest";
import {ThemeRequest} from "./themeRequest";
import {EditeurRequest} from "./editeurRequest";
import {CommentaireRequest} from "./commentaireRequest";
import {Jeu} from "../jeu";
import {AchatRequest} from "./achat-request";

export interface JeuxRequest {
  status: string,
  jeux: Jeu[],
}
