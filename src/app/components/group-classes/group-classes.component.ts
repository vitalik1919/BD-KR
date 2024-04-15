import {Component, OnInit} from '@angular/core';
import {NavMenuComponent} from "../nav-menu/nav-menu.component";
import {NgForOf, NgIf} from "@angular/common";
import {Subscription} from "../../entities/subscription";
import {GroupClassesService} from "./services/group-classes.service";
import {GroupClass} from "../../entities/groupClass";
import {Observable, take} from "rxjs";
import {parseJson} from "@angular/cli/src/utilities/json-file";

@Component({
  selector: 'app-group-classes',
  standalone: true,
  imports: [
    NavMenuComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './group-classes.component.html',
  styleUrl: './group-classes.component.css'
})
export class GroupClassesComponent implements OnInit {

  constructor(private groupClassesService : GroupClassesService) {
  }

  groupClasses : GroupClass[] = []
  table : any[] = []
  role : number = 3
  ngOnInit() {

    this.findGroupClasses()
      .then(classes => {
        this.groupClasses = classes;
        console.log(this.groupClasses)
        this.makeTable()
      })
      .catch(error => {
        console.error('Error:', error);
      });

    const roleJSON = localStorage.getItem("role")
    const roleObj = roleJSON ? parseJson(roleJSON) : null
    this.role = roleObj as number

  }

  makeTable() {
    const groupClassesMatrix: { [startTime: string]: { [day: string]: GroupClass } } = {};
    this.table = []
    for (const groupClass of this.groupClasses) {
      if (!groupClassesMatrix[groupClass.start_time]) {
        groupClassesMatrix[groupClass.start_time] = {};
      }
      groupClassesMatrix[groupClass.start_time][groupClass.day] = groupClass;
    }

    const startTimes = Object.keys(groupClassesMatrix);
    startTimes.sort();

    for (const startTime of startTimes) {
      const row: (GroupClass | null)[] = [];
      for (const day of ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']) {
        // Перевіряємо, чи існує значення GroupClass для даного часу та дня
        const classForDay = groupClassesMatrix[startTime][day];
        // Додаємо значення GroupClass або null до рядка
        row.push(classForDay ? classForDay : null);
      }
      this.table.push(row);
    }

    console.log(this.table);
  }
  getFirstNonNullStartTime(row: (GroupClass | null)[]): string {
    for (const cell of row) {
      if (cell) {
        return cell.start_time;
      }
    }
    return ''; // Повертаємо порожню строку, якщо всі елементи рядка нульові
  }
  getShortTime(time: string): string {
    return time.substr(0, 5); // Повертаємо перші п'ять символів (години та хвилини)
  }
  findGroupClasses() : Promise<GroupClass[]> {

    return new Promise((resolve, reject) => {
      this.groupClassesService.findGroupClasses().subscribe(classes => {
        resolve(classes);
      }, error => {
        reject(error);
      });
    });
  }

  purchaseClass(gclass: GroupClass) {

    if(!gclass) {
      console.log("Error fetching a group class from the table")
      return
    }
    const roleJSON = localStorage.getItem('role')
    const roleObj = roleJSON ? parseJson(roleJSON) : null
    const role = roleObj as number
    if(role !== 0) {
      alert('You must login to purchase a group class!')
      return
    }
    const customerJSON = localStorage.getItem('user')
    const customerObj = customerJSON ? parseJson(customerJSON) : null
    if(!customerObj) {
      return
    }

    return this.groupClassesService.addGroupClassToCustomer(customerObj._id, gclass).pipe(take(1)).subscribe({
      next:async (response: Observable<any>) => {
        console.log(response)
        this.groupClasses = await this.findGroupClasses()
        this.makeTable()
      },
      error: (error: any) => {
        console.error('Error: ', error);
      },
      complete: () => {
      }
    });
  }
}
