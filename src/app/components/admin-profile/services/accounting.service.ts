import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AccountingService {

  constructor(private http : HttpClient) { }

  getMonthlyIncomeData() {
    return this.http.get<any>('http://localhost:3000/incomes/monthly')
  }
  getMonthlyExpenseData() {
    return this.http.get<any>('http://localhost:3000/expenses/monthly')
  }
}
