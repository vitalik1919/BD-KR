import { Injectable } from '@angular/core';
import {map} from "rxjs";
import {TrainerClass} from "../../../entities/trainerClass";
import {HttpClient} from "@angular/common/http";
import { Subscription } from '../../../entities/subscription';
import {Customer} from "../../../entities/customer";
import {SubscriptionFilterDTO} from "../../../entities/subscriptionFilterDTO";
import {SubscriptionsComponent} from "../subscriptions.component";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  constructor(private http : HttpClient) { }

  findSubscriptions() {

    return this.http.get<any[]>(`http://localhost:3000/subscriptions`).pipe(
      map(response => {
        return response.map(item => new Subscription(
          item.id,
          item.type,
          item.price,
          item.days,
          item.start_time,
          item.end_time
        ));
      })
    );
  }

  purchaseSubscription(currSub : Subscription) {

    let customerJSON = localStorage.getItem('user')
    let customerObj = customerJSON ? JSON.parse(customerJSON) : null
    console.log(customerObj)
    const customer = new Customer(customerObj._id, customerObj._firstName,
      customerObj._lastName, customerObj._gender, customerObj._dateOfBirth)

    const dto = {
      customer: {
        id: customer.id,
        first_name: customer.firstName,
        last_name: customer.lastName,
        gender: customer.gender,
        date_of_birth: customer.dateOfBirth
      },
      subscription: {
        id: currSub.id,
        type: currSub.type,
        price: currSub.price,
        days: currSub.days,
        startTime: currSub.startTime,
        endTime: currSub.endTime
      }
    }
    return this.http.post<any>(`http://localhost:3000/bought-subscriptions/purchase`, dto)
  }

  deleteSubscription(id : number) {
    return this.http.delete<void>(`http://localhost:3000/subscriptions/${id}`)
  }
  createSubscription(sub : Subscription) {

    const body = {
      type: sub.type,
      price: sub.price,
      days: sub.days,
      start_time: sub.startTime,
      end_time: sub.endTime
    }
    return this.http.post<void>(`http://localhost:3000/subscriptions`, body)
  }
  filterSubscriptions(filterDTO : SubscriptionFilterDTO) {

    const filterData = {
      minPrice: filterDTO.minPrice,
      maxPrice: filterDTO.maxPrice,
      daysAmount: filterDTO.days,
      startTime: filterDTO.startTime,
      endTime: filterDTO.endTime
    }

    return this.http.post<any[]>(`http://localhost:3000/subscriptions/filtered`, filterData).pipe(
      map(response => {
        return response.map(item => new Subscription(
          item.id,
          item.type,
          item.price,
          item.days,
          item.start_time,
          item.end_time
        ));
      })
    );
  }
}
