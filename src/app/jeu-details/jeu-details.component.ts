import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-details',
  templateUrl: './jeu-details.component.html',
  styleUrls: ['./jeu-details.component.css']
})
export class JeuDetailsComponent {
  @Input() jeu: Jeu | null | undefined; // decorate the property with @Input()

  constructor() {
  }

  ngOnInit(): void {
  }
}
