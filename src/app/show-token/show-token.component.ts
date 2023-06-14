import { Component } from '@angular/core';
import {AuthentificationService} from "../authentification.service";
import {TokenStorageService} from "../token-storage.service";

@Component({
  selector: 'app-show-token',
  templateUrl: './show-token.component.html',
  styleUrls: ['./show-token.component.css']
})
export class ShowTokenComponent {
  tokenStorageService!: TokenStorageService;
  constructor(tokenStorageService: TokenStorageService) {
    this.tokenStorageService = tokenStorageService
  }
}
