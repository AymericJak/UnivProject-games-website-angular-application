import {Component, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {JeuRequest} from "../models/api/jeuRequest";
import {GameService} from "../services/game.service";
import {Observable} from "rxjs";
import {CommentaireRequest} from "../models/api/commentaireRequest";

@Component({
  selector: 'app-game-details',
  templateUrl: './jeu-details.component.html',
  styleUrls: ['./jeu-details.component.css']
})
export class JeuDetailsComponent {
  jeuRequest?: JeuRequest | null;
  nbLike?: Observable<number>;
  note?: Observable<number>;
  isLiked?: boolean = false;
  commentaires: CommentaireRequest[] = [];


  constructor(private gameService: GameService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id: number = +(this.route.snapshot.paramMap.get('id') || 0);
    this.nbLike = this.gameService.nbLikes(id);
    this.note = this.gameService.noteJeu(id);

    this.gameService.getJeu(id).subscribe(
      jeuRequest => {
        if (jeuRequest.commentaires) {
          this.commentaires = jeuRequest.commentaires;
        }
      },
      err => {
        console.log('Erreur lors de la récupération des commentaires : ', err);
      }
    );

  }
}
