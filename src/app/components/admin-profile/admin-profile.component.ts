import {Component, OnInit} from '@angular/core';
import {NavMenuComponent} from "../nav-menu/nav-menu.component";
import {NgForOf} from "@angular/common";
import {Admin} from "../../entities/admin";
import {BarChartModule, LineChartModule} from "@swimlane/ngx-charts";
import {AccountingService} from "./services/accounting.service";
import {saveAs} from "file-saver";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [
    NavMenuComponent,
    NgForOf,
    LineChartModule,
    FormsModule,
    BarChartModule
  ],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent implements OnInit {

  adminJSON = localStorage.getItem('user')
  adminObj = this.adminJSON ? JSON.parse(this.adminJSON) : null
  currentAdmin = this.adminObj as Admin

  results: { name: string; series: { value: number; name: string }[] }[] = []
  results_sub: { name: string; series: { value: number; name: string }[] }[] = []
  monthsCount : number = 12
  hoursCount: number = 24;
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

    this.getChartData()
  }
  getShortDate(date: string): string {
    return date.substr(0, 10)
  }

  getSubscriptionsData() {
    this.accountingService.getSubscriptionsData().subscribe(
      (jsonData: any[]) => {
        const jsonBlob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });
        saveAs(jsonBlob, 'subscriptions_history.json');
      },
      (error) => {
        console.error('Error fetching subscriptions history data:', error);
      }
    );
  }

  getChartData() {
    this.accountingService.getMonthlyExpenseData(this.monthsCount).subscribe((expenseData: any[]) => {
      this.accountingService.getMonthlyIncomeData(this.monthsCount).subscribe((incomeData: any[]) => {
        this.results = [
          {
            name: "Expenses",
            series: expenseData.map(item => ({ value: item.value, name: item.name }))
          },
          {
            name: "Incomes",
            series: incomeData.map(item => ({ value: item.value, name: item.name }))
          }
        ];
        // // Add all but the first item to this.results
        // this.results.forEach(result => {
        //   result.series = result.series.slice(1);
        // });
        console.log(this.results);
      }, error => {
        console.error("Error fetching expense data:", error);
      });
    }, error => {
      console.error("Error fetching income data:", error);
    });

    this.accountingService.getBoughtSubscriptionsMonthly().subscribe((subData: any[]) => {
      this.results_sub = [
        {
          name: "Subscriptions",
          series: subData.map(item => ({ value: item.value, name: item.name }))
        }
      ];
      console.log(this.results_sub);
    }, error => {
      console.error("Error fetching expense data:", error);
    });
  }

  exportProtocol() {
    this.accountingService.getProtocolData(this.hoursCount).subscribe(
      (jsonData: any[]) => {
        const result: string[] = jsonData.map(item => JSON.stringify(item));
        const resultString = result.join('\n');
        const jsonBlob = new Blob([resultString], { type: 'text/plain' });
        saveAs(jsonBlob, 'protocol_history.txt');
      },
      (error) => {
        console.error('Error fetching protocol history data:', error);
      }
    );
  }
}
