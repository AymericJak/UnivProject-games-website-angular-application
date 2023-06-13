import { Component, Input } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-game-details',
  templateUrl: './jeu-details.component.html',
  styleUrls: ['./jeu-details.component.css']
})
export class JeuDetailsComponent {
  @Input() jeu?: Jeu | null ;
  nbLike?: number;
  note?: number;
  isLiked?: boolean =false;
  // commentaires?: mettre la définition des commentaires


  constructor(public gameService: GameService, private route: ActivatedRoute ) {

  }

  ngOnInit(): void {
    const id: number = +(this.route.snapshot.paramMap.get('id') || 0);
    this.nbLike = this.gameService.nbLikes(+id) ;
    this.note = this.gameService.noteJeu(+id)
  }
}
