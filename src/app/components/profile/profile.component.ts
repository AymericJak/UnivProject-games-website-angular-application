import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {UserRequest} from "../../models/UserRequest";
import {UsersService} from "../../services/users/users.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profilCourant$: Observable<UserRequest>;

  constructor(private profilService: UsersService, private routes: ActivatedRoute) {
    this.profilCourant$ = this.profilService.getUser();
  }

  ngOnInit(): void {
    let id = this.routes.snapshot.paramMap.get('id');
    if (id) {
      this.profilCourant$ = this.profilService.getUser(parseInt(id));
    }
    else {
      this.profilCourant$ = this.profilService.getUser();
    }
    this.profilCourant$.subscribe((userRequest: UserRequest) => {
      console.log(userRequest.adherent.id);
      console.log(userRequest.adherent.login);
    });
  }
}
