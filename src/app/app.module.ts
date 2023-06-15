import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {FooterComponent} from './components/footer/footer.component';
import {AProposComponent} from './components/a-propos/a-propos.component';
import {ContactComponent} from './components/contact/contact.component';
import {JeuDetailsComponent} from './jeu-details/jeu-details.component';
import {HomeComponent} from "./components/home/home.component";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ShowTokenComponent} from './show-token/show-token.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {JeuxListeComponent} from './jeux-liste/jeux-liste.component';
import {GameService} from "./services/game.service";
import {MatTableModule} from "@angular/material/table";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ProfileComponent} from "./components/profile/profile.component";
import {MatListModule} from "@angular/material/list";
import {AuthInterceptor} from "./auth.interceptor";
import { CarteJeuComponent } from './carte-jeu/carte-jeu.component';
import {NgOptimizedImage} from "@angular/common";
import { CarteJeuNoteComponent } from './carte-jeu/carte-jeu-note/carte-jeu-note.component';
import { JeuCreationComponent } from './components/jeu-creation/jeu-creation.component';
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import { ProfileUpdateFormComponent } from './components/profile-update-form/profile-update-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ShowTokenComponent,
    FooterComponent,
    AProposComponent,
    ContactComponent,
    JeuDetailsComponent,
    HomeComponent,
    ProfileComponent,
    JeuxListeComponent,
    CarteJeuComponent,
    CarteJeuNoteComponent,
    JeuCreationComponent,
    ProfileUpdateFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatListModule,
    MatTableModule,
    NgOptimizedImage,
    MatGridListModule,
    MatIconModule
  ],
  providers: [
    GameService,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
