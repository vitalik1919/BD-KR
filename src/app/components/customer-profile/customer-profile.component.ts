import {Component, OnInit} from '@angular/core';
import {NavMenuComponent} from "../nav-menu/nav-menu.component";
import {NgForOf} from "@angular/common";
import {Customer} from "../../entities/customer";
import {CustomerProfileService} from "./services/customer-profile.service";
import {TrainerClass} from "../../entities/trainerClass";

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [
    NavMenuComponent,
    NgForOf
  ],
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.css'
})
export class CustomerProfileComponent implements OnInit {

  customerJSON = localStorage.getItem('user')
  customerObj = this.customerJSON ? JSON.parse(this.customerJSON) : null
  currentCustomer = this.customerObj as Customer
  trainerClasses : TrainerClass[] = []
  currentSub : string = ''
  currentGroupClass : string = ''

  constructor(private profileService : CustomerProfileService) {
  }

  ngOnInit() {

    this.currentCustomer = new Customer(
      this.customerObj._id,
      this.customerObj._firstName,
      this.customerObj._lastName,
      this.customerObj._gender,
      this.customerObj._dateOfBirth
    )
    console.log(this.currentCustomer)
    this.findTrainerClassesOfCustomer(this.currentCustomer)
      .then(classes => {
        this.trainerClasses = classes;
      })
      .catch(error => {
        console.error('Error:', error);
      });
    this.findCurrentSubOfCustomer(this.currentCustomer)
    this.findCurrentGroupClassOfCustomer(this.currentCustomer)
  }

  findTrainerClassesOfCustomer(customer: Customer): Promise<TrainerClass[]> {
    return new Promise((resolve, reject) => {
      this.profileService.findTrainerClassesOfCustomer(customer.id).subscribe(classes => {
        resolve(classes);
      }, error => {
        reject(error);
      });
    });
  }

  findCurrentSubOfCustomer(customer : Customer) {
    this.profileService.findCurrentSubOfCustomer(customer.id).subscribe(currentSub => {
      this.currentSub = currentSub
    });
  }

  findCurrentGroupClassOfCustomer(customer : Customer) {
    this.profileService.findCurrentGroupClassOfCustomer(customer.id).subscribe(currentSub => {
      this.currentGroupClass = currentSub
    });
  }
}
