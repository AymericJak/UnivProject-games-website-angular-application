import { Injectable } from '@angular/core';
import {TokenStorageService} from "./token-storage.service";
import {HttpClient} from "@angular/common/http";

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private baseUrl = "http://127.0.0.1:8000/api"
  private loginUrl = this.baseUrl + '/login';
  private registerUrl = this.baseUrl + '/register';


  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  login(email: string, password: string): void {
    this.http.post<any>(this.loginUrl, { email, password }).subscribe(
      response => {
        const token = response.authorisation.token;
        this.tokenStorageService.saveToken(token);
        console.log(response);
      },
      error => {
        console.log('Login failed:', error);
      }
    );
  }

  register(login:string, prenom:string, nom:string, pseudo:string, email: string, password: string): void {
    this.http.post<any>(this.registerUrl, { login, prenom, nom, pseudo, email, password }).subscribe(
      response => {
        const token = response.authorisation.token;
        this.tokenStorageService.saveToken(token);
        console.log(response);
      },
      error => {
        console.log('Login failed:', error);
      }
    );
  }
}
