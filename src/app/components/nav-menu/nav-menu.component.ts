import { Component } from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {Router} from "@angular/router";

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
export class NavMenuComponent {

  isDropdownOpen: boolean = false;
  constructor(private router: Router) { }

  openDropdown() {
    this.isDropdownOpen = true;
  }
  closeDropdown() {
      this.isDropdownOpen = false;
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
