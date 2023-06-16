import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {JeuRequest} from "../models/api/jeuRequest";
import {JeuxRequest} from "../models/api/jeuxRequest";
import {Jeu} from "../models/jeu";
import {CategorieRequest} from "../models/api/categorieRequest";
import {ThemeRequest} from "../models/api/themeRequest";
import {EditeurRequest} from "../models/api/editeurRequest";
import {Achat} from "../models/achat";
import {AchatRequest} from "../models/api/achat-request";
import {GameIsLikedRequest} from "../models/api/game-is-liked-request";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private http: HttpClient) {
  }

  getJeux(): Observable<JeuxRequest> {
    const url: string = 'http://localhost:8000/api/jeu';
    return this.http.get<JeuxRequest>(url)
      .pipe(
        catchError(err => {
          console.log('Erreur http : ', err);
          return of({ status: "Error", jeux: [] });
        }),
      );
  }

  getJeu(id: number): Observable<JeuRequest> {
    const url: string = `http://localhost:8000/api/jeu/${id}`;
    return this.http.get<JeuRequest>(url)
      .pipe(
        catchError(err => {
          console.log('Erreur http : ', err);
          throw err;
        })
      );
  }


  noteJeu(id: number): Observable<number> {
    return this.getJeu(id).pipe(
      map(jeu => jeu.note_moyenne || 0),
      catchError(err => {
        console.log('Erreur http : ', err);
        throw err;
      })
    );
  }

  nbLikes(id: number): Observable<number> {
    return this.getJeu(id).pipe(
      map(jeu => jeu.nb_likes || 0),
      catchError(err => {
        console.log('Erreur http : ', err);
        throw err;
      })
    );
  }

  createJeu(jeuRequest: Jeu): Observable<JeuRequest> {
    const url: string = 'http://localhost:8000/api/jeu';

    return this.http.post<JeuRequest>(url, jeuRequest).pipe(
      catchError(err => {
        console.log('Erreur http : ', err);
        throw err;
      })
    );
  }

  createAchat(achat: Achat): Observable<AchatRequest> {
    const url: string = 'http://localhost:8000/api/jeu/' + achat.jeu_id + '/achat';

    return this.http.post<AchatRequest>(url, achat).pipe(
      catchError(err => {
        console.log('Erreur http : ', err);
        throw err;
      })
    );
  }
  deleteAchat(id: number): Observable<any> {
    const url: string = 'http://localhost:8000/api/jeu/' + id + '/achat';

    return this.http.delete<any>(url).pipe(
      catchError(err => {
        console.log('Erreur http : ', err);
        throw err;
      })
    );
  }

  updateJeu(jeu: Jeu): Observable<Jeu> {
    const url: string = `http://localhost:8000/api/jeu/${jeu.id}/edit`;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.patch<Jeu>(url, jeu, httpOptions).pipe(
      catchError(err => {
        console.log('Erreur http : ', err);
        throw err;
      })
    );
  }

  uploadMedia(id: number) { //TODO
  }

  getCategories(): Observable<CategorieRequest[]> {
    const url: string = 'http://localhost:8000/api/categories';
    return this.http.get<CategorieRequest[]>(url)
      .pipe(
        catchError(err => {
          console.log('Erreur http : ', err);
          return of([]);
        })
      );
  }

  getThemes(): Observable<ThemeRequest[]> {
    const url: string = 'http://localhost:8000/api/themes';
    return this.http.get<ThemeRequest[]>(url)
      .pipe(
        catchError(err => {
          console.log('Erreur http : ', err);
          return of([]);
        })
      );
  }

  getEditeurs(): Observable<EditeurRequest[]> {
    const url: string = 'http://localhost:8000/api/editeurs';
    return this.http.get<EditeurRequest[]>(url)
      .pipe(
        catchError(err => {
          console.log('Erreur http : ', err);
          return of([]);
        })
      );
  }

  checkUserLike(jeuId: number): Observable<GameIsLikedRequest> {
    const url: string = `http://localhost:8000/api/jeu/${jeuId}/like/check`;
    return this.http.get<GameIsLikedRequest>(url);
  }

}
