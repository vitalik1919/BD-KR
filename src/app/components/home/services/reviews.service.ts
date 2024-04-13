import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserSignUpDTO} from "../../../entities/userSignUpDTO";
import {Review} from "../../../entities/Review";

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http : HttpClient) { }

  leaveReview(rating : number, description: string) {

    const customerJson = localStorage.getItem("user")
    const customer = customerJson ? JSON.parse(customerJson) : null
    console.log(customer)
    const reviewData = {
      rating: rating,
      description: description,
      customer: {
        id: customer._id,
        first_name: customer._firstName,
        last_name: customer._lastName,
        gender: customer._gender,
        date_of_birth: customer._dateOfBirth
      }
    }
    console.log(reviewData)

    return this.http.post<any>('http://localhost:3000/reviews', reviewData);
  }

}
