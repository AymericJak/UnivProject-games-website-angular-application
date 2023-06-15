import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { GameService } from "../services/game.service";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Jeu } from "../models/jeu";
import {UsersService} from "../services/users/users.service";
import {Observable} from "rxjs";
import {UserRequest} from "../models/UserRequest";

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.css']
})
export class CommentModalComponent {
  commentaire: string = '';
  note: number = 0;
  commentaireForm!: FormGroup;
  jeu: Jeu | undefined;
  etat:string='' ;
  profilCourant: Observable<UserRequest>;
  user_id: number=0;
  constructor(public dialogRef: MatDialogRef<CommentModalComponent>, public gameService: GameService, private route: ActivatedRoute, private http: HttpClient, private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: { jeu: Jeu }, public userService: UsersService
  ) {
    this.jeu = data.jeu;
    this.initCommentaireForm();
    this.fetchData();
    this.profilCourant = this.userService.getUser();

  }
  ngOnInit(): void {
    const id_jeu = this.jeu?.id;
    const userObservable: Observable<UserRequest> = this.userService.getUser();
    if (id_jeu){
      this.profilCourant = this.userService.getUser(parseInt(String(id_jeu)));
    }
    else {
      this.profilCourant = this.userService.getUser();
    }
    userObservable.subscribe((user) => {
      this.user_id = user.adherent.id;
    });
  }
  initCommentaireForm(): void {
    this.commentaireForm = this.formBuilder.group({
      commentaire: ['', Validators.required],
      note: ['', Validators.required],
      date_com: [''],
      jeu_id: [''],
      user_id: [''],
      etat: ['']
    });
  }

  fetchData(): void {
    this.fetchJeu();
  }

  fetchJeu(): void {
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
    const url: string = `http://localhost:8000/api/jeu/${id_jeu}/commentaire`;
    const commentaireData = {
      commentaire: this.commentaireForm.value.commentaire,
      date_com: new Date(),
      note: this.commentaireForm.value.note,
      jeu_id: this.jeu?.id,
      user_id: this.user_id,
      etat: 'public'
    };
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
    this.dialogRef.close();
  }

}
