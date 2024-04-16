export class TrainerClass {
  set id(value: number) {
    this._id = value;
  }

  set fname(value: string) {
    this._fname = value;
  }

  set lname(value: string) {
    this._lname = value;
  }

  set price(value: number) {
    this._price = value;
  }

  set start_time(value: string) {
    this._start_time = value;
  }

  set end_time(value: string) {
    this._end_time = value;
  }

  set weekdays(value: string[]) {
    this._weekdays = value;
  }

  constructor(private _id : number, private _fname : string, private _lname : string, private _price : number, private _start_time : string,
              private _end_time : string, private _weekdays : string[]) { }


  get id(): number {
    return this._id;
  }

  get price(): number {
    return this._price;
  }

  get start_time(): string {
    return this._start_time;
  }

  get fname(): string {
    return this._fname;
  }

  get lname(): string {
    return this._lname;
  }

  get end_time(): string {
    return this._end_time;
  }

  get weekdays(): string[] {
    return this._weekdays;
  }
}
