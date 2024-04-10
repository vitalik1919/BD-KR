import {Component, OnInit} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {Router} from "@angular/router";
import {Customer} from "../../entities/customer";
import {Admin} from "../../entities/admin";
import {Trainer} from "../../entities/trainer";

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css'
})
export class NavMenuComponent implements OnInit {

  isDropdownOpen: boolean = false;
  memberText : string = 'Become a member';
  constructor(private router: Router) {
  }

  ngOnInit() {

    //localStorage.removeItem("user")
    const userJSON = localStorage.getItem("user")
    if (userJSON !== null) {
      this.memberText = 'Log out';
    } else {
      this.memberText = 'Become a member';
    }
  }

  openDropdown() {
    this.isDropdownOpen = true;
  }
  closeDropdown() {
      this.isDropdownOpen = false;
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  navigateToProfile() {

    // const userJSON = localStorage.getItem("user")
    // const userObj = userJSON ? JSON.parse(userJSON) : null

    const roleJSON = localStorage.getItem("role")
    const roleObj = roleJSON ? JSON.parse(roleJSON) : null
    const role : number = roleObj as number

    switch(role) {
      case 0: {
        this.navigateTo("/customer_profile")
        break
      }
      case 1: {
        this.navigateTo("/admin_profile");
        break
      }
      case 2: {
        this.navigateTo("/trainer_profile");
        break
      }
    }

  }
  manageAccountState() {

    const user = localStorage.getItem("user")
    if(user !== null) {
      localStorage.removeItem("user")
      localStorage.removeItem("role")
      this.navigateTo("/")
      this.memberText = "Become a member"
    }
    else {
      this.navigateTo("/sign_up")
    }
  }
}
