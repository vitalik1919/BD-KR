import { Component } from '@angular/core';
import {NavMenuComponent} from "../nav-menu/nav-menu.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [
    NavMenuComponent,
    NgForOf
  ],
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.css'
})
export class CustomerProfileComponent {

}
