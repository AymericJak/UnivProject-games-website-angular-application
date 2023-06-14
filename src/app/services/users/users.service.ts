import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {TokenStorageService} from "../../token-storage.service";
import {UserRequest} from "../../models/UserRequest";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  /**
   * API URL.
   *
   * @private
   */
  private static readonly API_URL: string = 'http://localhost:8000/api/';

  /**
   * API URLs used for get users list.
   *
   * @private
   */
  private static readonly  API_URL_DICT: {[key: string]: string} = {
    'profile': UsersService.API_URL + 'profil',
    'update': UsersService.API_URL + 'update',
    'update-profile': UsersService.API_URL + 'updateAvatar',
  };

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  public getUserObservable(id: number = 0): Observable<any> {
    const token: string = this.tokenStorageService.getToken();
    const httpOptions: {} = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'bearer' + token,
        }
      ),
    };
    if (id === 0)
      return this.http.get<any>(`${UsersService.API_URL_DICT['profile']}`, httpOptions);
    else
      return this.http.get<any>(`${UsersService.API_URL_DICT['profile']}/${id}`, httpOptions);
  }

  /*
  public getUser(id: number = 0): any {
    let userRequest: UserRequest;
    this.getUserObservable(id).subscribe(
      (response): void => {
        if (response.status === 'success') {
          const adherent = response['adherent'];
          console.log(response['status']);
          userRequest = {
            status: response.status,
            message: response.message,
            adherent: response.adherent,
            commentaires: response.commentaires,
            achats: response.achats,
            likes: response.likes,
          };
          console.log(userRequest);
        } else {
          alert('ERROR : Indisponibilité de nos services');
        }
      },
      (error): void => {
        console.error(error);
      }
    );
    return this.getUserObservable(id).pipe(
      map((response) => {
        if (response.status === 'success') {
          const adherent = response['adherent'];
          const user: UserRequest = {
            id: adherent.id,
            login: adherent.login,
            email: adherent.email,
            valid: adherent.valide,
            firstname: adherent.nom,
            lastname: adherent.prenom,
            pseudo: adherent.pseudo,
            avatar: adherent.avatar,
          }
          return user;
        } else {
          alert('ERROR : Indisponibilité de nos services');
          return of([]);
        }
      })
    );
  }*/

  public getUser(id: number = 0): Observable<UserRequest> {
    const token: string = this.tokenStorageService.getToken();
    const httpOptions: {} = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'bearer' + token,
        }
      ),
    };
    if (id === 0)
      return this.http.get<any>(`${UsersService.API_URL_DICT['profile']}`, httpOptions).pipe(
        catchError(err => {
          console.error('HTTP ERROR:', err);
          throw err;
        })
      );
    else
      return this.http.get<any>(`${UsersService.API_URL_DICT['profile']}/${id}`, httpOptions).pipe(
        catchError(err => {
          console.error('HTTP ERROR:', err);
          throw err;
        })
      );
  }
}
