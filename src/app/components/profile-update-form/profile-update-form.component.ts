import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../services/users/users.service";
import {Observable} from "rxjs";
import {UserRequest} from "../../models/UserRequest";
import {UpdateProfileRequest} from "../../requests/UpdateProfileRequest";
import {UpdateProfileResponse} from "../../responses/UpdateProfileResponse";

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

  public id: number = 0;

  public hide: boolean = true;

  public personalProfile: boolean = true;

  constructor(public route: ActivatedRoute, private profilService: UsersService, private router: Router) {
    this.currentProfil$ = this.profilService.getUser();
  }

  ngOnInit(): void {
    this.id = +(this.route.snapshot.paramMap.get('id') || 0);
    const personalProfileString: string|null = this.route.snapshot.paramMap.get('personal-profile' || 'false');
    if (personalProfileString == 'false' || personalProfileString == null) this.personalProfile = false;
    console.log(this.personalProfile);
    this.currentProfil$ = this.profilService.getUser(parseInt(String(this.id)));
    this.currentProfil$.subscribe((userResponse: UserRequest) => {
      this.login.setValue(userResponse.adherent.login);
      this.email.setValue(userResponse.adherent.email);
      this.nom.setValue(userResponse.adherent.nom);
      this.prenom.setValue(userResponse.adherent.prenom);
      this.pseudo.setValue(userResponse.adherent.pseudo);
    });
  }

  /**
   * Event for edit button.
   */
  public editButtonEvent(): void {
    let valid: boolean = true;
    for (let formElementValue of [this.login.value, this.email.value, this.nom.value, this.prenom.value, this.pseudo.value, this.password.value]) {
      if (formElementValue == '') {
        valid = false;
        break;
      }
    }
    if (valid) {
      const newUser: UpdateProfileRequest = {
        id: this.id,
        login: this.login.value,
        email: this.email.value,
        nom: this.nom.value,
        prenom: this.prenom.value,
        password: this.password.value,
        pseudo: this.pseudo.value,
      }
      this.profilService.updateUser(this.id, newUser).subscribe(
        (updatedUser: UpdateProfileResponse) => {
          console.log('Updated');
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de l\'utilisateur : ', error);
        }
      )
      this.router.navigate(['/profile']).then(r => r);
    }
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
