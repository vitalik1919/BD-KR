import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Role, User} from "../../../entities/user";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {

    const loginData = {
      username: username,
      password: password
    };
    return this.http.post<any>('http://localhost:3000/auth/login', loginData);
  }

  getProfile(jwtToken : string): Observable<any> {

    return this.getUser(jwtToken).pipe(

      map(user => {

        switch(user.role) {

          case Role.CUSTOMER: {
            console.log("customer")
            break
          }
          case Role.ADMIN: {
            console.log("admin")
            break
          }
          case Role.TRAINER: {
            console.log("trainer")
            break
          }
          default: {
            break
          }

        }
        return user;
      })
    );

  }

  getUser(jwtToken : string) : Observable<User> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}`
    });
    return this.http.get<any>('http://localhost:3000/auth/profile', { headers: headers }).pipe(
      map(data => {
        return new User(data.id, data.role);
      })
    );
  }


}
