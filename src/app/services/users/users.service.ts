import { Injectable } from '@angular/core';
import {User} from "../../models/User";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable} from "rxjs";

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
    // TODO Get token with auth service.
    const token: string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL3JlZ2lzdGVyIiwiaWF0IjoxNjg2NzMxNDk0LCJleHAiOjE2ODY3MzUwOTQsIm5iZiI6MTY4NjczMTQ5NCwianRpIjoiZzFCVWNyRHowZnZNV0ZOQSIsInN1YiI6IjYiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.zYg4R8U32AKlqn04dW1E9hkdNUiBd2uJpAC5IHrpApM';
    const httpOptions: {} = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'bearer' + token,
        }
      ),
    };
    console.log('ici');
    // ${UsersService.API_URL_DICT['profile']}${id}
    return this.http.get(`https://google.com`, httpOptions);
  }
}
