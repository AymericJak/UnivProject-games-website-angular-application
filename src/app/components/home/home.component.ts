import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../services/users/users.service";
import {UserRequest} from "../../models/UserRequest";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UsersService) {
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe((userRequest: UserRequest) => {
      console.log(userRequest.adherent['id']);
    });
  }

}
