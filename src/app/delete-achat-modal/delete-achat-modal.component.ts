import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GameService} from "../services/game.service";
import {AchatRequest} from "../models/api/achat-request";

@Component({
  selector: 'app-delete-achat-modal',
  templateUrl: './delete-achat-modal.component.html',
  styleUrls: ['./delete-achat-modal.component.css']
})
export class DeleteAchatModalComponent {

  constructor(
    private dialogRef: MatDialogRef<DeleteAchatModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private jeuService: GameService
  ) {
  }

  onSave(): void {
    console.log('Achat jeu id :', this.data.id);

    this.jeuService.deleteAchat(this.data.id).subscribe(
      (createdAchat: AchatRequest) => {
        console.log('Update achat :', createdAchat);
      },
      (error) => {
        console.error('Erreur lors de l\'update de l\'achat', error);
      }
    );

    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
