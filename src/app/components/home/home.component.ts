import { Component } from '@angular/core';
import {NavMenuComponent} from "../nav-menu/nav-menu.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavMenuComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
