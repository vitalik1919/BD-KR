import {Injectable} from '@angular/core';
import {map} from "rxjs";
import {TrainerClass} from "../../../entities/trainerClass";
import {HttpClient} from "@angular/common/http";
import {Customer, Gender} from "../../../entities/customer";
import {TrainerClassFilterDTO} from "../../../entities/trainerClassFilterDTO";

@Injectable({
  providedIn: 'root'
})
export class TrainerClassesService {

  constructor(private http : HttpClient) { }

  findAvailable() {
    return this.http.get<any[]>(`http://localhost:3000/trainer-classes/available`).pipe(
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

  addClassToCustomer(id : number) {

    let customerJSON = localStorage.getItem('user')
    let customerObj = customerJSON ? JSON.parse(customerJSON) : null
    console.log(customerObj)
    const customer = new Customer(customerObj._id, customerObj._firstName,
      customerObj._lastName, customerObj._gender, customerObj._dateOfBirth)
    const trainerClassDTO = {
      customer: {
        id: customer.id,
        first_name: customer.firstName,
        last_name: customer.lastName,
        gender: customer.gender,
        date_of_birth: customer.dateOfBirth
      }
    }

    console.log(customer)
    return this.http.patch<any>(`http://localhost:3000/trainer-classes/customer/${id}`, trainerClassDTO)
  }

  filterClasses(filterDTO : TrainerClassFilterDTO) {

    const filterData = {
      minPrice: filterDTO.minPrice,
      maxPrice: filterDTO.maxPrice,
      chosenWeekdays: filterDTO.chosenWeekdays,
      startTime: filterDTO.startTime,
      endTime: filterDTO.endTime
    }

    return this.http.post<any[]>(`http://localhost:3000/trainer-classes/filtered`, filterData).pipe(
      map(response => {
        return response.map(item => new TrainerClass(
          item.id,
          item.trainer.first_name,
          item.trainer.last_name,
          item.price,
          item.start_time,
          item.end_time,
          item.weekdays.weekdays
        ));
      })
    );
  }

  deleteClass(id : number) {
    return this.http.delete<void>(`http://localhost:3000/trainer-classes/${id}`)
  }
}
