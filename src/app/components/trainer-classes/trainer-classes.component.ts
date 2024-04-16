import {Component, OnInit} from '@angular/core';
import {NavMenuComponent} from "../nav-menu/nav-menu.component";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Trainer} from "../../entities/trainer";
import {TrainerClass} from "../../entities/trainerClass";
import {TrainerClassesService} from "./services/trainer-classes.service";
import {Observable, switchMap, take} from "rxjs";
import {FormsModule} from "@angular/forms";
import {TrainerClassFilterDTO} from "../../entities/trainerClassFilterDTO";
import {parseJson} from "@angular/cli/src/utilities/json-file";

@Component({
  selector: 'app-trainer-classes',
  standalone: true,
  imports: [
    NavMenuComponent,
    NgForOf,
    NgOptimizedImage,
    NgIf,
    FormsModule
  ],
  templateUrl: './trainer-classes.component.html',
  styleUrl: './trainer-classes.component.css'
})
export class TrainerClassesComponent implements OnInit {

  priceShow : boolean = true
  weekdaysShow : boolean = true
  timeShow : boolean = true
  arrowSignP : string = '▼'
  arrowSignW : string = '▼'
  arrowSignT : string = '▼'

  priceOptions = [
    { label: '20 - 30$', id: 'group-checkbox1', startValue: 20, endValue: 30 },
    { label: '30 - 50$', id: 'group-checkbox2', startValue: 30, endValue: 50 },
    { label: '50 - 100$', id: 'group-checkbox3', startValue: 50, endValue: 100 },
    { label: 'All prices', id: 'group-checkbox4', startValue: 0, endValue: 10000 }
  ];

  weekdaysOptions = [
    { label: 'Monday', id: 'group-checkbox5', value: 'MON'},
    { label: 'Tuesday', id: 'group-checkbox6', value: 'TUE'},
    { label: 'Wednesday', id: 'group-checkbox7', value: 'WED' },
    { label: 'Thursday', id: 'group-checkbox8', value: 'THU' },
    { label: 'Friday', id: 'group-checkbox9', value: 'FRI' },
    { label: 'Saturday', id: 'group-checkbox10', value: 'SAT' }
  ];

  modalWeekdays = [
    { label: 'MON', id: 'group-checkbox11', value: 'MON'},
    { label: 'TUE', id: 'group-checkbox12', value: 'TUE'},
    { label: 'WED', id: 'group-checkbox13', value: 'WED' },
    { label: 'THU', id: 'group-checkbox14', value: 'THU' },
    { label: 'FRI', id: 'group-checkbox15', value: 'FRI' },
    { label: 'SAT', id: 'group-checkbox16', value: 'SAT' }
  ]
  chosenModalWeekdays : string[] = []

  trainerClasses : TrainerClass[] = []
  filterDTO : TrainerClassFilterDTO = new TrainerClassFilterDTO()

  role : number = 3
  userJSON = localStorage.getItem("user")
  userObj = this.userJSON ? parseJson(this.userJSON) : null
  isModalOpen: boolean = false;
  newClass: TrainerClass = new TrainerClass(1, this.userObj.first_name, this.userObj._last_name, 25, "07:00", "09:00", [])
  constructor(private trainerClassesService : TrainerClassesService)
  {}

  ngOnInit() {

    const roleJSON = localStorage.getItem("role")
    const roleObj = roleJSON ? parseJson(roleJSON) : null
    this.role = roleObj as number

    if(this.role === 2) {
      this.findAvailableOfTrainer()
        .then(classes => {
          this.trainerClasses = classes;
        })
        .catch(error => {
          console.error('Error:', error);
        });
      return
    }

    this.findAvailable()
      .then(classes => {
        this.trainerClasses = classes;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  findAvailable(): Promise<TrainerClass[]> {
    return new Promise((resolve, reject) => {
      this.trainerClassesService.findAvailable().subscribe(classes => {
        resolve(classes);
      }, error => {
        reject(error);
      });
    });
  }
  findAvailableOfTrainer(): Promise<TrainerClass[]> {

    if(!this.userObj)
      throw new Error("No trainer specified")

    return new Promise((resolve, reject) => {
      this.trainerClassesService.findAvailableOfTrainer(this.userObj._id).subscribe(classes => {
        resolve(classes);
      }, error => {
        reject(error);
      });
    });
  }
  showPrice() {
    this.priceShow = !this.priceShow
    if(this.priceShow)
      this.arrowSignP = '▼'
    else this.arrowSignP = '⎯'
  }
  showWeekdays() {
    this.weekdaysShow = !this.weekdaysShow
    if(this.weekdaysShow)
      this.arrowSignW = '▼'
    else this.arrowSignW = '⎯'
  }
  showTime() {
    this.timeShow = !this.timeShow
    if(this.timeShow)
      this.arrowSignT = '▼'
    else this.arrowSignT = '⎯'
  }
  purchaseClass(id : number) {

    let roleJSON = localStorage.getItem('role')
    let roleObj = roleJSON ? JSON.parse(roleJSON) : null
    let role = roleObj as number
    if(role !== 0) {
      alert("You must login to purchase a class!")
      return
    }
    return this.trainerClassesService.addClassToCustomer(id).pipe(take(1)).subscribe({
      next:async (response: Observable<any>) => {
        console.log(response)
        this.trainerClasses = await this.findAvailable()
      },
      error: (error: any) => {
        console.error('Error: ', error);
      },
      complete: () => {
      }
    });

  }
  onPriceChange(id: string) {
    const selectedOption =
      this.priceOptions.find(option => option.id === id)

    if (selectedOption) {
      this.filterDTO.minPrice = selectedOption.startValue
      this.filterDTO.maxPrice = selectedOption.endValue
    }
    else {
      console.log("ID not found")
    }
  }
  isWeekdaySelected(option: string): boolean {
    if(this.isModalOpen) {
      return this.chosenModalWeekdays.includes(option)
    }
    else return this.filterDTO.chosenWeekdays.includes(option)
  }
  onCheckboxChange(option: string) {
    if(this.isModalOpen) {
      const index = this.chosenModalWeekdays.indexOf(option);
      if (index === -1) {
        this.chosenModalWeekdays.push(option);
      } else {
        this.chosenModalWeekdays.splice(index, 1);
      }
      console.log(this.chosenModalWeekdays)
    }
    else {
      const index = this.filterDTO.chosenWeekdays.indexOf(option);
      if (index === -1) {
        this.filterDTO.chosenWeekdays.push(option);
      } else {
        this.filterDTO.chosenWeekdays.splice(index, 1);
      }
    }
  }
  applyFilters() {
    this.filterClasses()
      .then(classes => {
        this.trainerClasses = classes;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  filterClasses(): Promise<TrainerClass[]> {
    return new Promise((resolve, reject) => {
      this.trainerClassesService.filterClasses(this.filterDTO).subscribe(classes => {
        resolve(classes);
      }, error => {
        reject(error);
      });
    });
  }

  deleteClass(id: number) {

    const confirmation = confirm('Are you sure you want to delete this class?');
    if (!confirmation) {
      return
    }

    return this.trainerClassesService.deleteClass(id).pipe(
      take(1),
      switchMap(async () => {
        await this.findAvailable();
      })
    ).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: any) => {
        console.error('Error: ', error);
      },
      complete: () => {}
    });
  }

  openModal() {
    this.isModalOpen = true
  }

  addClass() {
    console.log(this.chosenModalWeekdays)
    this.newClass.weekdays = this.chosenModalWeekdays
    return this.trainerClassesService.createClass(this.newClass).pipe(
      take(1),
      switchMap(async () => {
        this.trainerClasses = await this.findAvailableOfTrainer()
        this.isModalOpen = false
      })
    ).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: any) => {
        console.error('Error: ', error);
      },
      complete: () => {}
    });
  }

  closeModal() {
    this.isModalOpen = false
  }
}
