import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AccountingService {

  constructor(private http : HttpClient) { }

  getMonthlyIncomeData(months : number) {
    return this.http.get<any>(`http://localhost:3000/incomes/monthly/${months}`)
  }
  getMonthlyExpenseData(months : number) {
    return this.http.get<any>(`http://localhost:3000/expenses/monthly/${months}`)
  }

  getSubscriptionsData() {
    return this.http.get<any>('http://localhost:3000/bought-subscriptions/json')
  }

  getBoughtSubscriptionsMonthly() {
    return this.http.get<any>('http://localhost:3000/bought-subscriptions/monthly')
  }

  getProtocolData(hoursCount : number) {
    return this.http.get<any>(`http://localhost:3000/protocols/${hoursCount}`)
  }
}
