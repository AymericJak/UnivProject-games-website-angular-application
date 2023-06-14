import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../services/users/users.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private userService: UsersService) {
  }

  /*
  ngOnInit(): void {
    this.userService.getUser(6)
      .subscribe(user => {
        console.log(user);
      })
  }*/

}
