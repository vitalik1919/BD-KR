import {Component, OnInit} from '@angular/core';
import {NavMenuComponent} from "../nav-menu/nav-menu.component";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavMenuComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  isCustomer : boolean = false
  ngOnInit() {
    const roleJson = localStorage.getItem("role")
    const roleObj = roleJson ? JSON.parse(roleJson) : null
    const role : number = roleObj as number
    this.isCustomer = role === 0;
  }

}
