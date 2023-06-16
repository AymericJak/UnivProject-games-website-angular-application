import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../services/users/users.service";
import {Observable} from "rxjs";
import {UserRequest} from "../../models/UserRequest";
import {UpdateProfileRequest} from "../../requests/UpdateProfileRequest";
import {UpdateProfileResponse} from "../../responses/UpdateProfileResponse";
import {UpdateAvatarProfileRequest} from "../../requests/UpdateAvatarProfileRequest";
import {UpdateAvatarProfileResponse} from "../../responses/UpdateAvatarProfileResponse";

@Component({
  selector: 'app-profile-avatar-update-form',
  templateUrl: './profile-avatar-update-form.component.html',
  styleUrls: ['./profile-avatar-update-form.component.css']
})
export class ProfileAvatarUpdateFormComponent implements OnInit {

  public avatar: FormControl = new FormControl('', [Validators.required]);

  public currentProfile$: Observable<UserRequest>;

  public id: number = 0;

  public personalProfile: boolean = true;

  constructor(public route: ActivatedRoute, private profileService: UsersService, private router: Router) {
    this.currentProfile$ = this.profileService.getUser();
  }

  ngOnInit(): void {
    this.id = +(this.route.snapshot.paramMap.get('id') || 0);
    const personalProfileString: string|null = this.route.snapshot.paramMap.get('personal-profile' || 'false');
    if (personalProfileString == 'false' || personalProfileString == null) this.personalProfile = false;
    this.currentProfile$ = this.profileService.getUser(parseInt(String(this.id)));
    this.currentProfile$.subscribe((userResponse: UserRequest) => {
      this.avatar.setValue(userResponse.adherent.avatar);
    });
  }

  /**
   * Event for edit button.
   */
  public editButtonEvent(): void {
    if (this.avatar.value != '') {
      const newUser: UpdateAvatarProfileRequest = {
        avatar: this.avatar.value,
      }
      this.profileService.updateAvatarUser(this.id, newUser).subscribe(
        (updatedUser: UpdateAvatarProfileResponse) => {
          console.log('Updated');
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de l\'utilisateur : ', error);
        }
      )
      if (this.personalProfile) {
        this.router.navigate(['/profile']).then(r => r);
      } else {
        this.router.navigate(['/profile', this.id]).then(r => r);
      }
    }
  }

  /**
   * Get the error message.
   */
  getErrorMessage(): string {
    if (this.avatar.hasError('required')) {
      return 'Ce champs doit comporter le lieu d\'une image valide';
    }
    return '';
  }

}
