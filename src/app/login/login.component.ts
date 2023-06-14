import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthentificationService} from "../authentification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private authService: AuthentificationService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const emailControl = this.loginForm.get('email');
      const passwordControl = this.loginForm.get('password');

      if (emailControl && passwordControl) {
        const email = emailControl.value;
        const password = passwordControl.value;
        this.authService.login(email, password);
      }
    }
  }
}
