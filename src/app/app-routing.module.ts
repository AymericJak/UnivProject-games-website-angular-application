import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AProposComponent} from "./components/a-propos/a-propos.component";
import {ContactComponent} from "./components/contact/contact.component";
import {JeuDetailsComponent} from "./jeu-details/jeu-details.component";
import {HomeComponent} from "./components/home/home.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {JeuxListeComponent} from "./jeux-liste/jeux-liste.component";
import {JeuCreationComponent} from "./components/jeu-creation/jeu-creation.component";
import {JeuModificationComponent} from "./components/jeu-modification/jeu-modification.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'jeux', component: JeuxListeComponent},
  {path: 'jeux/create', component: JeuCreationComponent},
  {path: 'jeux/:id/update', component: JeuModificationComponent},
  {path: 'jeux/:id', component: JeuDetailsComponent},
  {path: 'a-propos', component: AProposComponent},
  {path: 'contacts', component: ContactComponent},
  {path: 'profile', component: ProfileComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
