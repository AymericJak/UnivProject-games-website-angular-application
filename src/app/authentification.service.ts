import { Injectable } from '@angular/core';
import {TokenStorageService} from "./token-storage.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "./environment";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private router: Router, private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  login(email: string, password: string): void {
    this.http.post<any>(environment.apiUrl + "/login", { email, password }).subscribe(
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
    this.http.post<any>(environment.apiUrl + "/register", { login, prenom, nom, pseudo, email, password }).subscribe(
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

  logout(): void {
    this.tokenStorageService.signOut();
    this.http.post<any>(environment.apiUrl + "/logout", {}).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log('Logout failed:', error);
      }
    );
   this.router.navigate(['/']).then(r => r);
  }

  public userIsConnected(): boolean {
    console.log(this.tokenStorageService.getToken())
    return this.tokenStorageService.getToken() != '';
  }
}
