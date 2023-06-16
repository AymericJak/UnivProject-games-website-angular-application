import {Component} from '@angular/core';
import {GameService} from "../services/game.service";
import {HttpClient} from "@angular/common/http";
import {JeuxRequest} from "../models/api/jeuxRequest";
import {AuthentificationService} from "../authentification.service";
import {JeuRequest} from "../models/api/jeuRequest";

@Component({
  selector: 'app-jeux-liste',
  templateUrl: './jeux-liste.component.html',
  styleUrls: ['./jeux-liste.component.css']
})
export class JeuxListeComponent {
  dataSource: JeuxRequest = <JeuxRequest>{};
  authenticated: boolean = this.authService.userIsConnected();
  jeuRequests: JeuRequest[] = []
  constructor(private gameService: GameService, private http: HttpClient, private authService: AuthentificationService) {
  }

  ngOnInit(): void {
    this.gameService.getJeux().subscribe({
      next: (jeuxResponse) => {
        for (let jeu of jeuxResponse.jeux){
          jeu.image = new Image();
          console.log(jeu.image.src)
          jeu.image.src = "data:image/png;base64," + jeu.url_media;
        }
        this.dataSource = jeuxResponse;
        console.log(jeuxResponse)
      },
      error: () => {
        console.log('Erreur lors de la récupération des jeux : ');
      }
    });
  }
}
