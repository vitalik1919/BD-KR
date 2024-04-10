export enum Gender {
  MALE,
  FEMALE,
  OTHER
}
export class Customer {


  constructor(private _id : number, private _firstName : string, private _lastName : string,
              private _gender : Gender, private _dateOfBirth : string) {}


  get id(): number {
    return this._id;
  }
  get firstName(): string {
    return this._firstName;
  }
  get lastName(): string {
    return this._lastName;
  }
  get gender(): Gender {
    return this._gender;
  }
  get dateOfBirth(): string {
    return this._dateOfBirth;
  }
}
