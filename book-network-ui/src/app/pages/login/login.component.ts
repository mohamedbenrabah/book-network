import { Component } from '@angular/core';
import {AuthenticationRequest} from "../../services/models/authentication-request";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";
import {Authenticate$Params} from "../../services/fn/authentication/authenticate";
import {AuthenticationResponse} from "../../services/models/authentication-response";
import {TokenService} from "../../services/token/token.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  authRequest: AuthenticationRequest = {
    email: 'aaa',
    password: '252'
  };
  errorMsg: Array<string> = [];

  constructor(private router: Router, private authService: AuthenticationService,
              private tokenService: TokenService) {}

  login() {
    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res:AuthenticationResponse) => {
        //save the token
        this.tokenService.token = res.token as string;
        this.router.navigate(['books']);
      },
      error: (err: any) => {
        console.log("error login :",err);
        if(err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        }
        else {
          this.errorMsg.push(err.error.errorMsg);
        }
      }
    });
  }

  register() {
    this.router.navigate(['register']);
  }
}
