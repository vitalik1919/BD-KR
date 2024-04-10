import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "./services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router : Router, private loginService : LoginService) {
  }
  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  tryLogin(username: string, password: string): void {

    this.loginService.login(username, password).subscribe(
      (response) => {
        console.log('Login successful');
        const jwtToken = response.access_token
        this.getProfile(jwtToken);
      },
      (error) => {
        console.error('Login failed', error);
      }
    );

  }

  getProfile(jwtToken : string): void {

    this.loginService.getProfile(jwtToken).subscribe(
      (profile) => {
        console.log(profile);
      },
      (error) => {
        console.error('Error fetching profile', error);
      }
    );
  }
}
