import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from "./authentification.service";
import {Router} from "@angular/router";
import {UsersService} from "./services/users/users.service";
import {Observable} from "rxjs";
import {UserRequest} from "./models/UserRequest";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  /**
   * Title of application.
   */
  public title: string = 'Ludothèque';

  /**
   * Profile of the current user.
   */
  public currentProfile$: Observable<UserRequest>|null = null;

  constructor(private authService: AuthentificationService, private router: Router, private usersService: UsersService) {
    if (this.authService.userIsConnected())
      this.currentProfile$ = this.usersService.getUser();
  }

  /**
   * Logout the current user.
   */
  logout(): void {
    this.authService.logout();
    // if (this.router.url === '/home') {
    //   window.location.reload();
    // } else {
    //   this.router.navigate(['/home']).then(r => r);
    // }
  }

  /**
   * Check if the current user is connected.
   */
  public userIsConnected(): boolean {
    return this.authService.userIsConnected();
  }

}
