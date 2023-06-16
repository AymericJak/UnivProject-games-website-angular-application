import {Component, Input} from '@angular/core';
import {JeuRequest} from "../models/api/jeuRequest";
import {Jeu} from "../models/jeu";
import {GameService} from "../services/game.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-carte-jeu',
  templateUrl: './carte-jeu.component.html',
  styleUrls: ['./carte-jeu.component.css']
})
export class CarteJeuComponent {
  @Input() jeu?: Jeu;
  @Input() authenticated?: boolean;
  jeuRequest: JeuRequest = <JeuRequest>{}

  constructor(private gameService: GameService, private http: HttpClient) {
  }

  ngOnInit(): void {
    if (this.authenticated && this.jeu) {
      this.gameService.getJeu(this.jeu?.id).subscribe({
        next: jeuResponse => {
          this.jeuRequest = jeuResponse;
        },
        error: () => {
          console.log('Erreur lors de la récupération des jeux : ');
        }
      })
    }
  }
}
