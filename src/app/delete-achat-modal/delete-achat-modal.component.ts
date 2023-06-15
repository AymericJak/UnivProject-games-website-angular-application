import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GameService} from "../services/game.service";
import {Jeu} from "../models/jeu";
import {JeuRequest} from "../models/api/jeuRequest";
import {AchatRequest} from "../models/api/achat-request";
import {Achat} from "../models/achat";

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

  ngOnInit(): void {
  }

  onSave(): void {
      let achatData: Achat

      achatData = this.data.id;
      console.log('Achat data:', achatData);

      this.jeuService.updateAchat(achatData).subscribe(
        (createdAchat: AchatRequest) => {
          console.log('Achat réalisé avec succès', createdAchat);
        },
        (error) => {
          console.error('Erreur lors de la création de l\'achat', error);
        }
      );

      this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
