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
        this.dataSource = jeuxResponse;
      },
      error: () => {
        console.log('Erreur lors de la récupération des jeux : ');
      }
    });
  }

  filtrerParAgeMin(): void {
    this.gameService.filtrerParAgeMin().subscribe({
      next: (jeuxResponse) => {
        this.dataSource = jeuxResponse;
      },
      error: () => {
        console.log('Erreur lors du filtrage par âge minimum : ');
      }
    });
  }

  filtrerParDuree(): void {
    this.gameService.filtrerParDuree().subscribe({
      next: (jeuxResponse) => {
        this.dataSource = jeuxResponse;
      },
      error: () => {
        console.log('Erreur lors du filtrage par durée de partie : ');
      }
    });
  }

  filtrerParJoueursMin(): void {
    this.gameService.filtrerParJoueursMin().subscribe({
      next: (jeuxResponse) => {
        this.dataSource = jeuxResponse;
      },
      error: () => {
        console.log('Erreur lors du filtrage par nombre de joueurs minimum : ');
      }
    });
  }

  filtrerParJoueursMax(): void {
    this.gameService.filtrerParJoueursMax().subscribe({
      next: (jeuxResponse) => {
        this.dataSource = jeuxResponse;
      },
      error: () => {
        console.log('Erreur lors du filtrage par nombre de joueurs maximum : ');
      }
    });
  }

  filtrerParMostLiked(): void {
    this.gameService.filtrerParMostLiked().subscribe({
      next: (jeuxResponse) => {
        this.dataSource = jeuxResponse;
      },
      error: () => {
        console.log('Erreur lors du filtrage par les plus aimés : ');
      }
    });
  }

  filtrerParBestRated(): void {
    this.gameService.filtrerParBestRated().subscribe({
      next: (jeuxResponse) => {
        this.dataSource = jeuxResponse;
      },
      error: () => {
        console.log('Erreur lors du filtrage par les mieux notés : ');
      }
    });
  }
}
