import {Component, OnInit} from '@angular/core';
import {NavMenuComponent} from "../nav-menu/nav-menu.component";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SubscriptionFilterDTO} from "../../entities/subscriptionFilterDTO";
import {SubscriptionsService} from "./services/subscriptions.service";
import {Subscription} from "../../entities/subscription";
import {find, Observable, switchMap, take} from "rxjs";
import {parseJson} from "@angular/cli/src/utilities/json-file";

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [
    NavMenuComponent,
    NgForOf,
    FormsModule,
    NgIf
  ],
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.css'
})
export class SubscriptionsComponent implements OnInit {

  newSubscription : Subscription = new Subscription(
    1, "Regular",
    20, 30,
    "07:00:00",
    "22:00:00")

  priceShow : boolean = true
  daysShow : boolean = true
  timeShow : boolean = true
  arrowSignP : string = '▼'
  arrowSignW : string = '▼'
  arrowSignT : string = '▼'

  priceOptions = [
    { label: '25 - 50$', id: 'group-checkbox1', startValue: 25, endValue: 50 },
    { label: '50 - 75$', id: 'group-checkbox2', startValue: 50, endValue: 75 },
    { label: '75 - 100$', id: 'group-checkbox3', startValue: 75, endValue: 100 },
    { label: 'All prices', id: 'group-checkbox4', startValue: 0, endValue: 10000 }
  ];
  daysOptions = [
    { label: '30 days', id: 'group-checkbox5', value: 30},
    { label: '90 days', id: 'group-checkbox6', value: 90},
    { label: '180 days', id: 'group-checkbox7', value: 180},
    { label: '365 days', id: 'group-checkbox8', value: 365}
  ];
  timeOptions = [
    { label: 'Morning', id: 'group-checkbox9', startTime: '07:00', endTime: '12:00'},
    { label: 'Afternoon', id: 'group-checkbox10', startTime: '12:00', endTime: '17:00'},
    { label: 'Evening', id: 'group-checkbox11', startTime: '17:00', endTime: '22:00'},
    { label: 'All Day', id: 'group-checkbox12', startTime: '07:00', endTime: '22:00'}
  ];

  filterDTO : SubscriptionFilterDTO = new SubscriptionFilterDTO()
  subscriptions : Subscription[] = []
  role : number = 3
  isModalOpen: boolean = false

  constructor(private subscriptionsService : SubscriptionsService) {}

  ngOnInit() {
    this.findSubscriptions()
      .then(subs => {
        this.subscriptions = subs;
      })
      .catch(error => {
        console.error('Error:', error);
      });

    const roleJSON = localStorage.getItem("role")
    const roleObj = roleJSON ? parseJson(roleJSON) : null
    this.role = roleObj as number

  }

  findSubscriptions() : Promise<Subscription[]> {
    return new Promise((resolve, reject) => {
      this.subscriptionsService.findSubscriptions().subscribe(subs => {
        resolve(subs);
      }, error => {
        reject(error);
      });
    });
  }
  applyFilters() {
    this.filterSubscriptions()
      .then(subs => {
        this.subscriptions = subs;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  filterSubscriptions() : Promise<Subscription[]> {
    return new Promise((resolve, reject) => {
      this.subscriptionsService.filterSubscriptions(this.filterDTO).subscribe(classes => {
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
  showDays() {
    this.daysShow = !this.daysShow
    if(this.daysShow)
      this.arrowSignW = '▼'
    else this.arrowSignW = '⎯'
  }
  showTime() {
    this.timeShow = !this.timeShow
    if(this.timeShow)
      this.arrowSignT = '▼'
    else this.arrowSignT = '⎯'
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
  isDaySelected(option: number): boolean {
    return this.filterDTO.days.includes(option)
  }
  onCheckboxChange(option: number) {
    const index = this.filterDTO.days.indexOf(option);
    if (index === -1) {
      this.filterDTO.days.push(option);
    } else {
      this.filterDTO.days.splice(index, 1);
    }
  }
  onTimeChange(id: string) {
    const selectedOption =
      this.timeOptions.find(option => option.id === id)

    if (selectedOption) {
      this.filterDTO.startTime = selectedOption.startTime
      this.filterDTO.endTime = selectedOption.endTime
    }
    else {
      console.log("ID not found")
    }

    console.log(this.filterDTO)
  }
  purchaseSubscription(id: number) {

    const roleJson = localStorage.getItem('role')
    const role = roleJson ? parseJson(roleJson) : null
    if((role as number) !== 0) {
      alert("You need to login to buy a subscription !")
      return
    }

    const currSub = this.subscriptions.find(sub => sub.id === id)

    if(currSub) {

      return this.subscriptionsService.purchaseSubscription(currSub).pipe(take(1)).subscribe({
        next:async (response: Observable<any>) => {
          console.log(response)
          if(response === null)
            alert('You already own a subscription !')
        },
        error: (error: any) => {
          console.error('Error: ', error);
        },
        complete: () => {
        }
      });

    }
    else {
      return
    }
  }

  deleteSubscription(id: number) {

    const confirmation = confirm('Are you sure you want to delete this subscription?');
    if (!confirmation) {
      return
    }

    return this.subscriptionsService.deleteSubscription(id).pipe(
      take(1),
      switchMap(async () => {
        this.subscriptions = await this.findSubscriptions();
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

  openModal() {
    this.isModalOpen = true
  }

  addSubscription() {
    return this.subscriptionsService.createSubscription(this.newSubscription).pipe(
      take(1),
      switchMap(async () => {
        this.subscriptions = await this.findSubscriptions()
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
}
