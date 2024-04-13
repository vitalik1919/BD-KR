export class Review {
  get id(): number {
    return this._id;
  }

  get description(): string {
    return this._description;
  }

  get rating(): number {
    return this._rating;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  constructor(private _id : number, private _description : string, private _rating : number,
              private _firstName : string, private _lastName : string) {
  }
}
