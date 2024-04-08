import { Component } from '@angular/core';
import {NavMenuComponent} from "../nav-menu/nav-menu.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [
    NavMenuComponent,
    NgForOf
  ],
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.css'
})
export class SubscriptionsComponent {

}
