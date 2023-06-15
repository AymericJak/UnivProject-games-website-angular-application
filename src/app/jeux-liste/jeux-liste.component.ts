import {Component} from '@angular/core';
import {GameService} from "../services/game.service";
import {HttpClient} from "@angular/common/http";
import {JeuxRequest} from "../models/api/jeuxRequest";

@Component({
  selector: 'app-jeux-liste',
  templateUrl: './jeux-liste.component.html',
  styleUrls: ['./jeux-liste.component.css']
})
export class JeuxListeComponent {
  dataSource: JeuxRequest = <JeuxRequest>{};

  constructor(private gameService: GameService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.gameService.getJeux().subscribe({
      next: (jeuxResponse) => {
        this.dataSource = jeuxResponse;
      },
      error: () => {
        console.log('Erreur lors de la récupération des jeux : ');
      }
    })
  }
}
