import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {JeuRequest} from "../models/api/jeuRequest";
import {JeuxRequest} from "../models/api/jeuxRequest";
import {Jeu} from "../models/jeu";
import {CategorieRequest} from "../models/api/categorieRequest";
import {ThemeRequest} from "../models/api/themeRequest";
import {EditeurRequest} from "../models/api/editeurRequest";

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

  createJeu(jeuRequest: Jeu): Observable<Jeu> {
    const url: string = 'http://localhost:8000/api/jeu';

    return this.http.post<Jeu>(url, jeuRequest).pipe(
      catchError(err => {
        console.log('Erreur http : ', err);
        throw err;
      })
    );
  }

  updateJeu(jeuRequest: JeuRequest): Observable<JeuRequest> {
    const url: string = `http://localhost:8000/api/jeu/${jeuRequest.jeu.id}`;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.put<JeuRequest>(url, jeuRequest, httpOptions).pipe(
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
}
