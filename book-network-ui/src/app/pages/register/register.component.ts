import { Component } from '@angular/core';
import {RegistrationRequest} from "../../services/models/registration-request";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";
import {TokenService} from "../../services/token/token.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerRequest: RegistrationRequest = {
    email: '',
    firstname: '',
    lastname: '',
    password: ''
  }

  errorMsg: string[] = [];

  constructor(private router: Router, private authService: AuthenticationService,
              private tokenService: TokenService) {}

  register() {
    this.errorMsg = [];
    this.authService.register({
      body: this.registerRequest
    }).subscribe({
      next: (res: {}) => {
        this.router.navigate(['activate-account']);
      },
      error: (err: any) => {
        this.errorMsg = err.error.validationErrors;
      }
    });
  }

  login() {
    this.router.navigate(['login']);
  }
}
