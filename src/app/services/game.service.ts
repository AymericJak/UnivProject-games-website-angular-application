import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {Jeu} from "../jeu";

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

}
