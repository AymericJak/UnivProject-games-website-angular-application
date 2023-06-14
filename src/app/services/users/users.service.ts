import { Injectable } from '@angular/core';
import {User} from "../../models/User";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

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
    'profile': UsersService.API_URL + 'profil/',
    'update': UsersService.API_URL + 'update/',
    'update-profile': UsersService.API_URL + 'updateAvatar/',
  };

  constructor(private http: HttpClient) {
  }

  public getUser(id: number): Observable<any> {
    return this.http.get(`${UsersService.API_URL_DICT['profile']}${id}`);
  }
}
