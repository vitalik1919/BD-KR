import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {SignUpService} from "./services/sign-up.service";
import {User} from "../../entities/user";
import {UserSignUpDTO} from "../../entities/userSignUpDTO";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  userData : UserSignUpDTO = new UserSignUpDTO()
  confirm : string = ''

  constructor(private router : Router, private signUpService : SignUpService) {
  }
  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  trySignUp() {

    if(this.userData.username === '' ||
       this.userData.first_name === '' ||
       this.userData.last_name === '' ||
       this.userData.date_of_birth === '' ||
       this.userData.password === '' ||
       this.confirm === '') {
      alert("All fields must be filled !")
      return
    }

    if (this.confirm === this.userData.password) {
      this.signUpService.createUser(this.userData).subscribe(
        (response) => {
          console.log("User signed up:", response);
          this.navigateTo("/login")
        },
        (error) => {
          console.error("Error during sign up:", error);
        }
      );
    } else {
      alert("Passwords don't match");
    }
  }
}
