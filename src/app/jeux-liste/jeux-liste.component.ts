import {Component} from '@angular/core';
import {Jeu} from "../models/jeu";
import {GameService} from "../services/game.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-jeux-liste',
  templateUrl: './jeux-liste.component.html',
  styleUrls: ['./jeux-liste.component.css']
})
export class JeuxListeComponent {
  lesColonnes: string[] = ['nom', 'description', 'langue', "Catégorie", "Thème"];
  dataSource: Jeu[] = [];

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
    this.gameService.getJeux().subscribe({
      next: (jeuxResponse) => {
        this.dataSource = jeuxResponse.jeux;
        console.log(jeuxResponse.jeux[1])
      },
      error: () => {
        console.log('Erreur lors de la récupération des jeux : ');
      }
    })
  }
}
