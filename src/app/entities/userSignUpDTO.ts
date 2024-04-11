import {Gender} from "./customer";

export class UserSignUpDTO {

  username : string
  password : string
  role : number
  first_name : string
  last_name : string
  gender : Gender
  date_of_birth : string

  constructor() {
    this.username = ''
    this.password = ''
    this.role = 0
    this.first_name = ''
    this.last_name = ''
    this.gender = Gender.OTHER
    this.date_of_birth = ''
  }

}
