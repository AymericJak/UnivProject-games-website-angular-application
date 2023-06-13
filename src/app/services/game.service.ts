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
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.get<Jeu>(url, httpOptions)
      .pipe(
        catchError(err => {
          console.log('Erreur http : ', err);
          throw err;
        })
      );
  }


  noteJeu(id: number): Observable<number> {
    const url: string = `http://localhost:8000/api/commentaires/`;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.get<Commentaire[]>(url, httpOptions).pipe(
      map(commentaires => {
        const filteredCommentaires: Commentaire[] = commentaires.filter(commentaire => commentaire.jeu.id === id);
        if (filteredCommentaires.length === 0) {
          return 0; // No comments
        } else {
          const sumNotes = filteredCommentaires.reduce((acc, commentaire) => acc + commentaire.note, 0);
          return sumNotes / filteredCommentaires.length;
        }
      }),
      catchError(err => {
        console.log('Erreur http : ', err);
        throw err;
      })
    );
  }



}
