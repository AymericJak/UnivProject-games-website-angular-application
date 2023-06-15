import {Component, Input} from '@angular/core';
import {JeuRequest} from "../models/api/jeuRequest";
import {Jeu} from "../models/jeu";

@Component({
  selector: 'app-carte-jeu',
  templateUrl: './carte-jeu.component.html',
  styleUrls: ['./carte-jeu.component.css']
})
export class CarteJeuComponent {
  @Input() jeu?: Jeu;
}
