import {Jeu} from "../jeu";

export interface JeuxRequest {
  status: string,
  jeux: Jeu[],
}
