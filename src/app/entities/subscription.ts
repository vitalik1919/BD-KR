export class Subscription {

  constructor(private _id : number, private _type : string, private _price : number,
              private _days : number, private _startTime : string, private _endTime : string) {
  }


  get id(): number {
    return this._id;
  }

  get type(): string {
    return this._type;
  }

  get price(): number {
    return this._price;
  }

  get days(): number {
    return this._days;
  }

  get startTime(): string {
    return this._startTime;
  }

  get endTime(): string {
    return this._endTime;
  }
}
