import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AProposComponent} from "./a-propos/a-propos.component";
import {ContactComponent} from "./contact/contact.component";
import {JeuDetailsComponent} from "./jeu-details/jeu-details.component";

const routes: Routes = [
  { path: 'details', component: JeuDetailsComponent},
  { path: 'aPropos', component: AProposComponent },
  { path: 'contacts', component: ContactComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
