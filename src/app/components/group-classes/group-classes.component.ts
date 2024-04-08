import { Component } from '@angular/core';
import {NavMenuComponent} from "../nav-menu/nav-menu.component";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-group-classes',
  standalone: true,
  imports: [
    NavMenuComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './group-classes.component.html',
  styleUrl: './group-classes.component.css'
})
export class GroupClassesComponent {

}
