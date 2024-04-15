export class Admin {

  constructor(private _id : number, private _firstName : string, private _lastName : string,
              private _wage : number, private _email : string, private _regDate : string) {}


  get id(): number {
    return this._id;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get wage(): number {
    return this._wage;
  }

  get email(): string {
    return this._email;
  }

  get regDate(): string {
    return this._regDate;
  }
}
