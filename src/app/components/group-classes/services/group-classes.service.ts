import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {Subscription} from "../../../entities/subscription";
import {GroupClass} from "../../../entities/groupClass";
import {parseJson} from "@angular/cli/src/utilities/json-file";

@Injectable({
  providedIn: 'root'
})
export class GroupClassesService {

  constructor(private http : HttpClient) { }

  findGroupClasses() {

    return this.http.get<any[]>(`http://localhost:3000/group-classes`).pipe(
      map(response => {
        return response.map(item => new GroupClass(
          item.groupClass_id,
          item.groupClass_type,
          item.groupClass_price,
          item.groupClass_start_time,
          item.groupClass_day,
          item.trainer_first_name,
          item.trainer_last_name,
          item.groupClass_space_left
        ));
      })
    );
  }

  addGroupClassToCustomer(id : number, gclass : GroupClass) {

    const dto = {
      groupClass: {
        id: gclass.id,
        type: gclass.type,
        price: gclass.price,
        day: gclass.day,
        start_time: gclass.price,
        space_left: gclass.space_left
      }
    }
    console.log(dto)
    return this.http.patch<any>(`http://localhost:3000/customers/group-class/${id}`, dto)

  }
}
