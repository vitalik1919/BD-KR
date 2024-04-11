import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserSignUpDTO} from "../../../entities/userSignUpDTO";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http : HttpClient) { }

  createUser(createUserDto: UserSignUpDTO): Observable<UserSignUpDTO> {
    console.log(createUserDto)
    return this.http.post<UserSignUpDTO>('http://localhost:3000/users/sign-up', createUserDto);
  }

}
