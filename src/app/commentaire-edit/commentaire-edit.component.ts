// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import {Commentaire} from "../models/commentaire";
//
// @Component({
//   selector: 'app-commentaire-edit-modal',
//   templateUrl: './commentaire-edit-modal.component.html',
//   styleUrls: ['./commentaire-edit-modal.component.css']
// })
// export class CommentaireEditModalComponent {
//   commentaireForm: FormGroup;
//
//   constructor(
//     public dialogRef: MatDialogRef<CommentaireEditModalComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: { commentaire: Commentaire },
//     private formBuilder: FormBuilder
//   ) {
//     this.commentaireForm = this.formBuilder.group({
//       commentaire: [data.commentaire.commentaire, Validators.required],
//       note: [data.commentaire.note, Validators.required]
//     });
//   }
//
//   cancel(): void {
//     this.dialogRef.close();
//   }
//
//   onSubmit(): void {
//     if (this.commentaireForm.valid) {
//       const commentaireData = {
//         ...this.data.commentaire,
//         commentaire: this.commentaireForm.value.commentaire,
//         note: this.commentaireForm.value.note
//       };
//
//       // Appeler le service approprié (par exemple, GameService) pour mettre à jour le commentaire dans la base de données
//
//       console.log('Commentaire modifié :', commentaireData);
//       this.dialogRef.close();
//     }
//   }
// }
