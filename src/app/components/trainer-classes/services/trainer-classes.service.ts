import {Injectable} from '@angular/core';
import {map} from "rxjs";
import {TrainerClass} from "../../../entities/trainerClass";
import {HttpClient} from "@angular/common/http";
import {Customer, Gender} from "../../../entities/customer";
import {TrainerClassFilterDTO} from "../../../entities/trainerClassFilterDTO";
import {parseJson} from "@angular/cli/src/utilities/json-file";

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
          JSON.parse(item.trainerClass_weekdays).weekdays
        ));
      })
    );
  }

  findAvailableOfTrainer(id : number) {
    return this.http.get<any[]>(`http://localhost:3000/trainer-classes/trainer/available/${id}`).pipe(
      map(response => {
        return response.map(item => new TrainerClass(
          item.trainerClass_id,
          item.trainer_first_name,
          item.trainer_last_name,
          item.trainerClass_price,
          item.trainerClass_start_time,
          item.trainerClass_end_time,
          JSON.parse(item.trainerClass_weekdays).weekdays
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

    const roleJSON = localStorage.getItem("role")
    const roleObj = roleJSON ? parseJson(roleJSON) : null
    const role = roleObj as number

    const userJSON = localStorage.getItem("user")
    const userObj = userJSON ? parseJson(userJSON) : null
    const userId = userObj._id as number

    return this.http.post<any[]>(`http://localhost:3000/trainer-classes/filtered/${role}/${userId}`, filterData).pipe(
      map(response => {
        return response.map(item => new TrainerClass(
          item.id,
          item.trainer.first_name,
          item.trainer.last_name,
          item.price,
          item.start_time,
          item.end_time,
          JSON.parse(item.weekdays).weekdays
        ));
      })
    );
  }

  deleteClass(id : number) {
    return this.http.delete<void>(`http://localhost:3000/trainer-classes/${id}`)
  }

  createClass(tclass : TrainerClass) {

    const trainerJSON = localStorage.getItem('user')
    const trainer = trainerJSON ? parseJson(trainerJSON) : null

    const body = {
      price: tclass.price,
      weekdays: JSON.stringify({weekdays: tclass.weekdays}),
      start_time: tclass.start_time,
      end_time: tclass.end_time,
      trainer: {
        id: trainer._id,
        first_name: trainer._first_name,
        last_name: trainer._last_name,
        wage: trainer._wage,
        specialty: trainer._specialty
      }
    }
    console.log(body)
    return this.http.post<void>(`http://localhost:3000/trainer-classes`, body)
  }
}
