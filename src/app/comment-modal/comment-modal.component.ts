import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {GameService} from "../services/game.service";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.css']
})
export class CommentModalComponent {
  commentaire: string = ''; // Ajouter un initialisateur ou attribuer une valeur par défaut
  note: number=0 ;

  constructor(public dialogRef: MatDialogRef<CommentModalComponent>,public gameService: GameService, private route: ActivatedRoute, private http: HttpClient) {

  }

  saveComment(): void {
    const id: number = +(this.route.snapshot.paramMap.get('id') || 0);

    this.gameService.getJeu(+id).subscribe(
      jeuRequest => {
        if (jeuRequest.jeu.id) {
          const id_jeu = jeuRequest.jeu.id;
          const url: string = `http://localhost:8000/api/jeu/${id_jeu}/commentaire`;
          this.http
            .post(url, {})
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
    this.dialogRef.close();
  }

  cancel(): void {
    // Annuler la saisie du commentaire et fermer la fenêtre modale
    this.dialogRef.close();
  }
}
