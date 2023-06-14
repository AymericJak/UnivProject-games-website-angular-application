import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {Jeu} from "../jeu";
import {Commentaire} from "../commentaire";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private http: HttpClient) {
  }

  getJeux(): Observable<Jeu[]> {
    const url: string = 'http://localhost:8000/api/jeu';
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.get<any>(url, httpOptions)
      .pipe(
        map(res => res.data.item),
        catchError(err => {
          console.log('Erreur http : ', err);
          return of([]);
        }),
      );
  }

  getJeu(id: number): Observable<Jeu> {
    const url: string = `http://localhost:8000/api/jeu/${id}`;
    let res = this.http.get<Jeu>(url)
      .pipe(
        catchError(err => {
          console.log('Erreur http : ', err);
          throw err;
        })
      );
    console.log(res);
    return res;
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
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.post<Jeu>(url, jeuRequest, httpOptions).pipe(
      catchError(err => {
        console.log('Erreur http : ', err);
        throw err;
      })
    );
  }

  updateJeu(jeuRequest: Jeu): Observable<Jeu> {
    const url: string = `http://localhost:8000/api/jeu/${jeuRequest.id}`;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.put<Jeu>(url, jeuRequest, httpOptions).pipe(
      catchError(err => {
        console.log('Erreur http : ', err);
        throw err;
      })
    );
  }

  uploadMedia(id: number) { //TODO
  }
}
