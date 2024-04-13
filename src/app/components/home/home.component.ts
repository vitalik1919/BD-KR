import {Component, OnInit} from '@angular/core';
import {NavMenuComponent} from "../nav-menu/nav-menu.component";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ReviewsService} from "./services/reviews.service";
import {Observable, take} from "rxjs";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavMenuComponent,
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  isCustomer : boolean = false
  description: string = ''
  rating: number = 5

  constructor(private reviewsService : ReviewsService) {}

  ngOnInit() {
    const roleJson = localStorage.getItem("role")
    const roleObj = roleJson ? JSON.parse(roleJson) : null
    const role : number = roleObj as number
    this.isCustomer = role === 0;
  }

  leaveReview() {

    return this.reviewsService.leaveReview(this.rating, this.description).pipe(take(1)).subscribe({
      next:async (response: Observable<any>) => {
        this.rating = 5
        this.description = ''
      },
      error: (error: any) => {
        console.error('Error: ', error);
      },
      complete: () => {
      }
    });

  }

}
