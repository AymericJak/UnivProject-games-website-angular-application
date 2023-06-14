import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AProposComponent} from "./components/a-propos/a-propos.component";
import {ContactComponent} from "./components/contact/contact.component";
import {JeuDetailsComponent} from "./jeu-details/jeu-details.component";
import {HomeComponent} from "./components/home/home.component";
import {JeuxListeComponent} from "./jeux-liste/jeux-liste.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'jeux', component: JeuxListeComponent},
  { path: 'jeux/:id', component: JeuDetailsComponent},
  { path: 'a-propos', component: AProposComponent },
  { path: 'contacts', component: ContactComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
