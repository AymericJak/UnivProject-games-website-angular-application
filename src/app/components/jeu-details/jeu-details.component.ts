import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GameService} from "../../services/games/game.service";
import {Observable} from "rxjs";
import {CommentaireRequest} from "../../requests/commentaireRequest";
import {HttpClient} from "@angular/common/http";
import {Jeu} from "../../models/jeu";
import {UsersService} from "../../services/users/users.service";
import {UserRequest} from "../../requests/UserRequest";
import {CreateAchatModalComponent} from "../create-achat-modal/create-achat-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {AchatRequest} from "../../requests/achat-request";
import {DeleteAchatModalComponent} from "../delete-achat-modal/delete-achat-modal.component";
import {CommentModalComponent} from "../comment-modal/comment-modal.component";
import {CommentaireEditComponent} from "../commentaire-edit/commentaire-edit.component";
import {DeleteCommentaireComponent} from "../delete-commentaire/delete-commentaire.component";

@Component({
  selector: 'app-game-details',
  templateUrl: './jeu-details.component.html',
  styleUrls: ['./jeu-details.component.css']
})
export class JeuDetailsComponent implements OnInit {
  profilCourant: Observable<UserRequest>;
  user_id = -1;
  id_jeu: number | undefined;
  jeu: Jeu | undefined;
  noteMoyenne = 0;
  nbLike = 0;
  prixMoyen = 0;
  isLiked = false;
  commentaires: CommentaireRequest[] = []
  achats: AchatRequest[] = [];
  showOldestFirst = false;
  showNewestFirst = false;
  isPurchased = false;

  constructor(public gameService: GameService, private route: ActivatedRoute, private http: HttpClient, public userService: UsersService, public dialog: MatDialog) {
    this.profilCourant = this.userService.getUser();
  }

  ngOnInit(): void {
    this.id_jeu = +(this.route.snapshot.paramMap.get('id') || 0);
    const userObservable: Observable<UserRequest> = this.userService.getUser();
    this.profilCourant = this.userService.getUser();

    this.gameService.getJeu(this.id_jeu).subscribe({
      next: (jeuResponse) => {
        if (jeuResponse.jeu) { // Check if the `jeu` object exists
          this.jeu = jeuResponse.jeu;
          this.nbLike = jeuResponse.nb_likes;
          this.noteMoyenne = jeuResponse.note_moyenne;
          this.commentaires = jeuResponse.commentaires;
          this.prixMoyen = jeuResponse.prix_moyen;
          this.achats = jeuResponse.achats;
          this.isPurchased = this.achats.some((achatRequest) =>achatRequest.achat.jeu_id == jeuResponse.jeu.id )
          this.sortCommentaires();
        }
      },
      error: (err) => {
        console.log('Erreur lors de la récupération des informations du jeu : ', err);
      }
    });
    userObservable.subscribe((user) => {
      if (user && user.adherent && user.adherent.id) {
        const user_id: number = user.adherent.id;
        this.user_id = user.adherent.id;
        this.commentaires.sort((a, b) => {
          if (a.user_id === user_id && b.user_id !== user_id) {
            return -1;
          } else if (a.user_id !== user_id && b.user_id === user_id) {
            return 1;
          } else {
            return 0;
          }
        });
      }
    });

    this.gameService.checkUserLike(this.id_jeu).subscribe({
      next: (gameIsLikedResponse) => {
        this.isLiked = gameIsLikedResponse.is_liked;
      },
      error: (err) => {
        console.log('Erreur lors de la vérification du like : ', err);
      }
    })
  }

  toggleLike(): void {
    const id: number = +(this.route.snapshot.paramMap.get('id') || 0);

    this.gameService.getJeu(+id).subscribe(
      jeuRequest => {
        if (jeuRequest.jeu.id) {
          const id_jeu = jeuRequest.jeu.id;
          const url = `http://localhost:8000/api/jeu/${id_jeu}/like`;
          this.http
            .post(url, {})
            .subscribe(
              () => {
                this.isLiked = !this.isLiked;
                this.nbLike = this.isLiked ? this.nbLike + 1 : this.nbLike - 1;
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

  openModalBuy(): void {
    const dialogRef  = this.dialog.open(CreateAchatModalComponent, {
      width: '400px',
      height: '260px',
      disableClose: true,
      data: this.jeu
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.isPurchased = true;
      }
    });
  }

  openModalUnBuy(): void {
    const dialogRef = this.dialog.open(DeleteAchatModalComponent, {
      width: '400px',
      disableClose: true,
      data: this.jeu
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.isPurchased = false;
      }
    });
  }

  openCommentModal(jeu: Jeu): void {
    this.dialog.open(CommentModalComponent, {
      width: '400px',
      data: {jeu}
    });

  }

  editCommentaire(commentaire: CommentaireRequest, jeu: Jeu): void {
    this.dialog.open(CommentaireEditComponent, {
      data: {commentaire, jeu}
    });
  }

  deleteCommentaire(id: number) {
    this.dialog.open(DeleteCommentaireComponent, {
      data: {id}
    });
  }
}
