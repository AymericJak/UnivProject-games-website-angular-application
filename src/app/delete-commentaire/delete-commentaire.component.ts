import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommentaireRequest} from "../models/api/commentaireRequest";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Jeu} from "../models/jeu";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UsersService} from "../services/users/users.service";
import {Observable} from "rxjs";
import {UserRequest} from "../models/UserRequest";

@Component({
  selector: 'app-delete-commentaire',
  templateUrl: './delete-commentaire.component.html',
  styleUrls: ['./delete-commentaire.component.css']
})
export class DeleteCommentaireComponent {
  user_id: number=0;
  id:number;
  constructor(
    public dialogRef: MatDialogRef<DeleteCommentaireComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id:number},
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    public userService: UsersService
  ) {
    this.id = data.id;
  }
  ngOnInit(): void {
    const userObservable: Observable<UserRequest> = this.userService.getUser();
    userObservable.subscribe((user) => {
      this.user_id = user.adherent.id;
    });
  }
  cancel(): void {
    this.dialogRef.close();
  }


  confirmDelete(): void {
      const url: string = `http://localhost:8000/api/commentaire/${this.id}`;
      this.http.delete(url)
        .subscribe(
          (response) => {
            console.log('Commentaire delete avec succès !');
            this.dialogRef.close();
          },
          (error) => {
            console.error("Une erreur s'est produite lors de l'ajout du commentaire :", error);
          }
        );
      this.dialogRef.close();
  }
}
