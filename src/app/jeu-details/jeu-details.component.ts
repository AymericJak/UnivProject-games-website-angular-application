import {Component, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Jeu} from "../jeu";
import {GameService} from "../services/game.service";
import {Observable} from "rxjs";
import {Commentaire} from "../commentaire";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-game-details',
  templateUrl: './jeu-details.component.html',
  styleUrls: ['./jeu-details.component.css']
})
export class JeuDetailsComponent {
  @Input() jeu?: Jeu | null;
  nbLike?: Observable<number>;
  note?: Observable<number>;
  isLiked?: boolean = false;
  commentaires: Commentaire[] = [];


  constructor(public gameService: GameService, private route: ActivatedRoute,private http: HttpClient) {
  }

  ngOnInit(): void {
    const id: number = +(this.route.snapshot.paramMap.get('id') || 0);
    this.nbLike = this.gameService.nbLikes(+id);
    this.note = this.gameService.noteJeu(+id);

    this.gameService.getJeu(+id).subscribe(
      jeu => {
        if (jeu.commentaires) {
          this.commentaires = jeu.commentaires;
        }
      },
      err => {
        console.log('Erreur lors de la récupération des commentaires : ', err);
      }
    );

  }

  toggleLike(): void {
    this.isLiked = !this.isLiked;

    const id: number = +(this.route.snapshot.paramMap.get('id') || 0);

    this.gameService.getJeu(+id).subscribe(
      jeu => {
        if (jeu.id) {
          const id_jeu = jeu.id;
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
