export class Subscription {

  constructor(private _id : number, private _type : string, private _price : number,
              private _days : number, private _startTime : string, private _endTime : string) {
  }


  set id(value: number) {
    this._id = value;
  }

  set type(value: string) {
    this._type = value;
  }

  set price(value: number) {
    this._price = value;
  }

  set days(value: number) {
    this._days = value;
  }

  set startTime(value: string) {
    this._startTime = value;
  }

  set endTime(value: string) {
    this._endTime = value;
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
