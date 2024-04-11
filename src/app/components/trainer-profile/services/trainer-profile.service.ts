import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {TrainerClass} from "../../../entities/TrainerClass";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TrainerProfileService {

  constructor(private http : HttpClient) { }

  findTrainerClassesOfTrainer(id : number) : Observable<TrainerClass[]> {
    return this.http.get<any[]>(`http://localhost:3000/trainer-classes/trainer/${id}`).pipe(
      map(response => {
        return response.map(item => new TrainerClass(
          item.customer_first_name,
          item.customer_last_name,
          item.trainerClass_price,
          item.trainerClass_start_time,
          item.trainerClass_end_time,
          item.trainerClass_weekdays.weekdays
        ));
      })
    );
  }
}
