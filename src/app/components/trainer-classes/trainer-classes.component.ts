import { Component } from '@angular/core';
import {NavMenuComponent} from "../nav-menu/nav-menu.component";
import {NgForOf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-trainer-classes',
  standalone: true,
  imports: [
    NavMenuComponent,
    NgForOf,
    NgOptimizedImage
  ],
  templateUrl: './trainer-classes.component.html',
  styleUrl: './trainer-classes.component.css'
})
export class TrainerClassesComponent {

}
