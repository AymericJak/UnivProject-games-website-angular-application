import {Component, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {JeuRequest} from "../models/api/jeuRequest";
import {GameService} from "../services/game.service";
import {Observable} from "rxjs";
import {CommentaireRequest} from "../models/api/commentaireRequest";
import {HttpClient} from "@angular/common/http";
import {Jeu} from "../models/jeu";
import {UsersService} from "../services/users/users.service";
import {UserRequest} from "../models/UserRequest";
import {MatDialog} from "@angular/material/dialog";
import {CommentModalComponent} from "../comment-modal/comment-modal.component";

@Component({
  selector: 'app-game-details',
  templateUrl: './jeu-details.component.html',
  styleUrls: ['./jeu-details.component.css']
})
export class JeuDetailsComponent {
  // note: number = 0;
  isLiked: boolean = false;
  jeuRequest: JeuRequest | undefined;
  jeu: Jeu | undefined;
  noteMoyenne: number = 0;
  nbLike: number = 0;
  prixMoyen: number = 0;
  commentaires: CommentaireRequest[] = []
  profilCourant: Observable<UserRequest>;
  showOldestFirst: boolean = false;
  showNewestFirst: boolean = false;
  id_jeu: number | undefined;

  constructor(public gameService: GameService, private route: ActivatedRoute, private http: HttpClient, public userService: UsersService,public dialog: MatDialog) {
    this.profilCourant = this.userService.getUser();
  }

  ngOnInit(): void {
    this.id_jeu = +(this.route.snapshot.paramMap.get('id') || 0);
    const userObservable: Observable<UserRequest> = this.userService.getUser();
    if (this.id_jeu){
      this.profilCourant = this.userService.getUser(parseInt(String(this.id_jeu)));
    }
    else {
      this.profilCourant = this.userService.getUser();
    }
    this.gameService.getJeu(this.id_jeu).subscribe({
      next: (jeuResponse) => {
        this.jeu = jeuResponse.jeu;
        this.nbLike = jeuResponse.nb_likes;
        this.noteMoyenne = jeuResponse.note_moyenne;
        this.commentaires = jeuResponse.commentaires;
        this.prixMoyen = jeuResponse.prix_moyen
        this.sortCommentaires();
      },
      error: (err) => {
        console.log('Erreur lors de la récupération des informations du jeu : ', err);
      }
    });
    userObservable.subscribe((user) => {
      const user_id: number = user.adherent.id;
      this.commentaires.sort((a, b) => {
        if (a.user_id === user_id && b.user_id !== user_id) {
          return -1;
        } else if (a.user_id !== user_id && b.user_id === user_id) {
          return 1;
        } else {
          return 0;
        }
      });
    });

  }

  toggleLike(): void {


    const id: number = +(this.route.snapshot.paramMap.get('id') || 0);

    this.gameService.getJeu(+id).subscribe(
      jeuRequest => {
        if (jeuRequest.jeu.id) {
          const id_jeu = jeuRequest.jeu.id;
          const url: string = `http://localhost:8000/api/jeu/${id_jeu}/like`;
          this.http
            .post(url, {})
            .subscribe(
              (response) => {
                this.isLiked = !this.isLiked;
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
  toggleSortOldestFirst(): void {
    this.showOldestFirst = !this.showOldestFirst;
    this.showNewestFirst = false;
    this.sortCommentaires();
  }

  toggleSortNewestFirst(): void {
    this.showNewestFirst = !this.showNewestFirst;
    this.showOldestFirst = false;
    this.sortCommentaires();
  }

  sortCommentaires(): void {
    if (this.showOldestFirst) {
      this.commentaires = this.commentaires.slice().sort((a, b) => {
        return new Date(a.date_com).getTime() - new Date(b.date_com).getTime();
      });
    } else if (this.showNewestFirst) {
      this.commentaires = this.commentaires.slice().sort((a, b) => {
        return new Date(b.date_com).getTime() - new Date(a.date_com).getTime();
      });
    } else {
      this.commentaires = this.commentaires.slice();
    }
  }

  openCommentModal(jeu:Jeu): void {
    const dialogRef = this.dialog.open(CommentModalComponent, {
      width: '400px',
      data: {jeu} // Passer le jeu en tant que donnée à la fenêtre modale
    });
  }

  openEditModal(id: number) {

  }
}
