import {Component, OnInit} from '@angular/core';
import {NavMenuComponent} from "../nav-menu/nav-menu.component";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ReviewsService} from "./services/reviews.service";
import {Observable, take} from "rxjs";
import {Review} from "../../entities/review";

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
  reviewPage: number = 1
  reviewLimit: number = 3
  reviews: Review[] = []
  totalReviewCount: number = 0

  constructor(private reviewsService : ReviewsService) {}

  ngOnInit() {
    const roleJson = localStorage.getItem("role")
    const roleObj = roleJson ? JSON.parse(roleJson) : null
    const role : number = roleObj as number
    this.isCustomer = role === 0;
    if(this.isCustomer) {
      this.getReviewCount()
      this.assignReviews()
    }
  }

  assignReviews() {
    this.getReviewGroup()
      .then(reviews => {
        this.reviews = reviews;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  leaveReview() {

    return this.reviewsService.leaveReview(this.rating, this.description).pipe(take(1)).subscribe({
      next:async (response: Observable<any>) => {
        this.rating = 5
        this.description = ''
        this.totalReviewCount++
      },
      error: (error: any) => {
        console.error('Error: ', error);
      },
      complete: () => {
      }
    });

  }

  getReviewCount() {
    this.reviewsService.getReviewCount().subscribe((count: number) => {
      console.log(count)
      this.totalReviewCount = count;
    });
  }

  getReviewGroup(): Promise<Review[]> {

    return new Promise((resolve, reject) => {
      this.reviewsService.getReviewGroup(
        (this.reviewPage - 1) * this.reviewLimit + 1,
                  this.reviewLimit).subscribe(reviews => {
        resolve(reviews);
      }, error => {
        reject(error);
      });
    });

  }

  decrementPageNumber() {
    if(this.reviewPage !== 1)
      this.reviewPage--
    this.assignReviews()
  }
  incrementPageNumber() {

    if(this.totalReviewCount === this.reviewPage * this.reviewLimit)
      return

    this.reviewPage++
    this.assignReviews()
  }
}
