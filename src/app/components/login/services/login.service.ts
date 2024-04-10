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

    const token = this.getToken()
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const user = this.http.get<any>('http://localhost:3000/auth/profile', { headers: headers})
    return user;
  }

  getToken() {
    const jwtToken = localStorage.getItem("jwt");
    return jwtToken ? JSON.parse(jwtToken) : null;
  }

}
