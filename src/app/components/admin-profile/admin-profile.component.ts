import {Component, OnInit} from '@angular/core';
import {NavMenuComponent} from "../nav-menu/nav-menu.component";
import {NgForOf} from "@angular/common";
import {Admin} from "../../entities/admin";
import {LineChartModule} from "@swimlane/ngx-charts";
import {AccountingService} from "./services/accounting.service";

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [
    NavMenuComponent,
    NgForOf,
    LineChartModule
  ],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent implements OnInit {

  adminJSON = localStorage.getItem('user')
  adminObj = this.adminJSON ? JSON.parse(this.adminJSON) : null
  currentAdmin = this.adminObj as Admin

  results: { name: string; series: { value: number; name: string }[] }[] = []

  constructor(private accountingService : AccountingService) {
  }
  ngOnInit() {
    this.currentAdmin = new Admin(
      this.adminObj._id,
      this.adminObj._firstName,
      this.adminObj._lastName,
      this.adminObj._wage,
      this.adminObj._email,
      this.adminObj._regDate
    )
    // Отримання даних про доходи
    this.accountingService.getMonthlyIncomeData().subscribe((incomeData: any[]) => {
      // Отримання даних про витрати
      this.accountingService.getMonthlyExpenseData().subscribe((expenseData: any[]) => {
        console.log(incomeData);
        console.log(expenseData);

        // Формування даних для графіку
        this.results = [
          {
            name: "Incomes",
            series: incomeData.map(item => ({ value: item.value, name: item.name }))
          },
          {
            name: "Expenses",
            series: expenseData.map(item => ({ value: item.value, name: item.name }))
          }
        ];

        console.log(this.results);
      }, error => {
        console.error("Error fetching expense data:", error);
      });
    }, error => {
      console.error("Error fetching income data:", error);
    });
  }

  getShortDate(date: string): string {
    return date.substr(0, 10)
  }
}
