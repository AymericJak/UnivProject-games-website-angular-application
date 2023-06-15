import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {UsersService} from "../../services/users/users.service";
import {Observable} from "rxjs";
import {UserRequest} from "../../models/UserRequest";

@Component({
  selector: 'app-profile-update-form',
  templateUrl: './profile-update-form.component.html',
  styleUrls: ['./profile-update-form.component.css']
})
export class ProfileUpdateFormComponent implements OnInit {

  public login: FormControl = new FormControl('', [Validators.required]);

  public email: FormControl = new FormControl('', [Validators.required, Validators.email]);

  public nom: FormControl = new FormControl('', [Validators.required]);

  public prenom: FormControl = new FormControl('', [Validators.required]);

  public pseudo: FormControl = new FormControl('', [Validators.required]);

  public password: FormControl = new FormControl('', [Validators.required]);


  public currentProfil$: Observable<UserRequest>;

  public loginValue: string = '';

  public emailValue: string = '';

  public nomValue: string = '';

  public prenomValue: string = '';

  public pseudoValue: string = '';

  public passwordValue: string = '';

  constructor(public route: ActivatedRoute, private profilService: UsersService) {
    this.currentProfil$ = this.profilService.getUser();
  }

  ngOnInit(): void {
    const id: number = +(this.route.snapshot.paramMap.get('id') || 0);
    this.currentProfil$ = this.profilService.getUser(parseInt(String(id)));
    this.currentProfil$.subscribe((userResponse: UserRequest) => {
      this.loginValue = userResponse.adherent.login;
      this.emailValue = userResponse.adherent.email;
      this.nomValue = userResponse.adherent.nom;
      this.prenomValue = userResponse.adherent.prenom;
      this.pseudoValue = userResponse.adherent.pseudo;
    });
  }

  public editButtonEvent(): void {
    console.log(this.login.value);
  }

  /**
   * Get the error message.
   */
  getErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'Ce champs ne peut pas être vide';
    }
    return this.email.hasError('email') ? 'Ce n\'est pas une adresse mail valide' : '';
  }

}
