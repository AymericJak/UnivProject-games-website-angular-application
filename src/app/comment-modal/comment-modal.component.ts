import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { GameService } from "../services/game.service";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Jeu } from "../models/jeu";

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.css']
})
export class CommentModalComponent {
  commentaire: string = ''; // Ajouter un initialisateur ou attribuer une valeur par défaut
  note: number = 0;
  commentaireForm!: FormGroup;
  jeu: Jeu | undefined;
  etat:string='' ;

  constructor(public dialogRef: MatDialogRef<CommentModalComponent>, public gameService: GameService, private route: ActivatedRoute, private http: HttpClient, private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: { jeu: Jeu }
  ) {
    this.jeu = data.jeu;
    this.initCommentaireForm();
    this.fetchData();

  }

  initCommentaireForm(): void {
    this.commentaireForm = this.formBuilder.group({
      commentaire: ['', Validators.required],
      note: ['', Validators.required]
    });
  }

  fetchData(): void {
    this.fetchCommentaire();
  }

  fetchCommentaire(): void {
    console.log(this.jeu?.id);
    if(this.jeu?.id) {
      this.gameService.getJeu(this.jeu?.id).subscribe({
        next: (jeuResponse) => {
          this.jeu = jeuResponse.jeu;
        },
        error: (err) => {
          console.log('Erreur lors de la récupération des informations du jeu : ', err);
        }
      });
    }
  }

  saveComment(): void {
    const id_jeu = this.jeu?.id;
    console.log(id_jeu);
    const url: string = `http://localhost:8000/api/jeu/${id_jeu}/commentaire`;
    const commentaireData = {
      commentaire: this.commentaireForm.value.commentaire,
      note: this.commentaireForm.value.note,
      etat: 'public',
      date_com: new Date()
    }
    this.http.post(url, commentaireData)
      .subscribe(
        (response) => {
          console.log('Commentaire ajouté avec succès !');
          this.dialogRef.close();
        },
        (error) => {
          console.error("Une erreur s'est produite lors de l'ajout du commentaire :", error);
        }
      );
  }

  cancel(): void {
    // Annuler la saisie du commentaire et fermer la fenêtre modale
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.commentaireForm.valid) {
      this.saveComment();
    }
  }
}
