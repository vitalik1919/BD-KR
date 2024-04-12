import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {TrainerClass} from "../../../entities/trainerClass";

@Injectable({
  providedIn: 'root'
})
export class CustomerProfileService {

  constructor(private http: HttpClient) { }

  findTrainerClassesOfCustomer(id : number) : Observable<TrainerClass[]> {
    return this.http.get<any[]>(`http://localhost:3000/trainer-classes/customer/${id}`).pipe(
      map(response => {
        return response.map(item => new TrainerClass(
          item.trainerClass_id,
          item.trainer_first_name,
          item.trainer_last_name,
          item.trainerClass_price,
          item.trainerClass_start_time,
          item.trainerClass_end_time,
          item.trainerClass_weekdays.weekdays
        ));
      })
    );
  }


  findCurrentSubOfCustomer(id: number): Observable<string> {
    return this.http.get<any>(`http://localhost:3000/subscriptions/customer/${id}`).pipe(
      map(response => {
        return response.subscription_type
      })
    );
  }
}
