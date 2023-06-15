import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from "./authentification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public title: string = 'Ludothèque';

  constructor(private authService: AuthentificationService, private router: Router) { }

  logout(): void {
    this.authService.logout();
    if (this.router.url === '/home') {
      window.location.reload();
    } else {
      this.router.navigate(['/home']).then(r => r);
    }
  }

  public userIsConnected(): boolean {
    // TODO Check if user is connected
    return false;
  }
}
