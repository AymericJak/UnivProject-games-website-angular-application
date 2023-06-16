import {Jeu} from "../jeu";
import {Achat} from "../achat";
import {UserRequest} from "../UserRequest";

export interface AchatRequest {
  status: string,
  message: string,
  achat: Achat,
  adherant: UserRequest,
  jeu: Jeu,
}
