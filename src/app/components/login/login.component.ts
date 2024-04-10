import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "./services/login.service";
import {Customer} from "../../entities/customer";
import {Admin} from "../../entities/admin";
import {Trainer} from "../../entities/trainer";

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
        localStorage.setItem("jwt", JSON.stringify(jwtToken));
        this.getProfile(jwtToken);
        this.navigateTo("/")
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
        localStorage.setItem("role", profile.role)
        switch(profile.role) {
          case 0: {
            let customer = new Customer(
              profile.data.id,
              profile.data.first_name,
              profile.data.last_name,
              profile.data.gender,
              profile.data.date_of_birth,
            )
            console.log(customer)
            localStorage.setItem("user", JSON.stringify(customer))
            break
          }
          case 1: {
            let admin = new Admin()
            console.log(admin)
            localStorage.setItem("user", JSON.stringify(admin))
            break
          }
          case 2: {
            let trainer = new Trainer()
            console.log(trainer)
            localStorage.setItem("user", JSON.stringify(trainer))
            break
          }
          default:
            break
        }
      },
      (error) => {
        console.error('Error fetching profile', error);
      }
    );
  }
}
