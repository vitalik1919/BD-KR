import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavMenuComponent} from "./components/nav-menu/nav-menu.component";
import {HomeComponent} from "./components/home/home.component";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavMenuComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'bdGym';
}
