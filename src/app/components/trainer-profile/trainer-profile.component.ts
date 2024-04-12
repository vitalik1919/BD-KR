import {Component, OnInit} from '@angular/core';
import {NavMenuComponent} from "../nav-menu/nav-menu.component";
import {NgForOf} from "@angular/common";
import {TrainerClass} from "../../entities/trainerClass";
import {Trainer} from "../../entities/trainer";
import {TrainerProfileService} from "./services/trainer-profile.service";

@Component({
  selector: 'app-trainer-profile',
  standalone: true,
    imports: [
        NavMenuComponent,
        NgForOf
    ],
  templateUrl: './trainer-profile.component.html',
  styleUrl: './trainer-profile.component.css'
})
export class TrainerProfileComponent implements OnInit {

  trainerJSON = localStorage.getItem('user')
  trainerObj = this.trainerJSON ? JSON.parse(this.trainerJSON) : null
  currentTrainer = this.trainerObj as Trainer
  trainerClasses : TrainerClass[] = []

  constructor(private profileService : TrainerProfileService) {
  }

  ngOnInit() {

    this.currentTrainer = new Trainer(
      this.trainerObj._id,
      this.trainerObj._first_name,
      this.trainerObj._last_name,
      this.trainerObj._wage,
      this.trainerObj._specialty
    )
    console.log(this.currentTrainer)
    this.findTrainerClassesOfTrainer(this.currentTrainer)
      .then(classes => {
        this.trainerClasses = classes;
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }

  findTrainerClassesOfTrainer(trainer: Trainer): Promise<TrainerClass[]> {
    return new Promise((resolve, reject) => {
      this.profileService.findTrainerClassesOfTrainer(trainer.id).subscribe(classes => {
        resolve(classes);
      }, error => {
        reject(error);
      });
    });
  }

}
