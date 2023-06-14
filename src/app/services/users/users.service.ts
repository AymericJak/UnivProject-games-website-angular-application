import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {TokenStorageService} from "../../token-storage.service";
import {UserRequest} from "../../models/UserRequest";
import {environment} from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  /**
   * API URL.
   *
   * @private
   */
  private static readonly API_URL: string = environment.apiUrl + '/';

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
