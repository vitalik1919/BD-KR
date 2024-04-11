export class TrainerClass {

  constructor(private _fname : string, private _lname : string, private _price : number, private _start_time : string,
              private _end_time : string, private _weekdays : string[]) { }


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
