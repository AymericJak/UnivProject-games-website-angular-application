import {Component, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {JeuRequest} from "../models/api/jeuRequest";
import {GameService} from "../services/game.service";
import {Observable} from "rxjs";
import {CommentaireRequest} from "../models/api/commentaireRequest";
import {HttpClient} from "@angular/common/http";

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

  constructor(public gameService: GameService, private route: ActivatedRoute,private http: HttpClient) {
  }

  ngOnInit(): void {
    const id: number = +(this.route.snapshot.paramMap.get('id') || 0);
    this.nbLike = this.gameService.nbLikes(id);
    this.note = this.gameService.noteJeu(id);
    const user_id = this.user.getUser();

    this.commentaires.sort((a, b) => {
      if (a.user_id === user_id && b.user_id !== user_id) {
        return -1;
      } else if (a.user_id !== user_id && b.user_id === user_id) {
        return 1;
      } else {
        return 0;
      }
    });

    this.gameService.getJeu(id).subscribe({
      next: (jeuRequest) => {
        if (jeuRequest.commentaires) {
          this.commentaires = jeuRequest.commentaires;
        }
      },
      error: (err) => {
        console.log('Erreur lors de la récupération des commentaires : ', err);
      }
    })
  }

  toggleLike(): void {
    this.isLiked = !this.isLiked;

    const id: number = +(this.route.snapshot.paramMap.get('id') || 0);

    this.gameService.getJeu(+id).subscribe(
      jeuRequest => {
        if (jeuRequest.jeu.id) {
          const id_jeu = jeuRequest.jeu.id;
          const url: string = `http://localhost:8000/api/jeu/${id_jeu}`;
          this.http
            .post(url,{})
            .subscribe(
              (response) => {
                console.log('Ajout du like effectuée avec succès !');
              },
              (error) => {
                console.error(
                  "Une erreur s'est produite lors de l'ajout du like :",
                  error
                );
              }
            );
        }
      },
      err => {
        console.log('Erreur lors de la récupération des commentaires : ', err);
      }
    );
  }
}
