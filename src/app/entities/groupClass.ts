export class GroupClass {

  constructor(private _id : number, private _type : string, private _price : number, private _start_time : string,
              private _day : string, private _trainer_fname : string, private _trainer_lname : string,
              private _space_left : number) {
  }


  get space_left(): number {
    return this._space_left;
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

  get start_time(): string {
    return this._start_time;
  }

  get day(): string {
    return this._day;
  }

  get trainer_fname(): string {
    return this._trainer_fname;
  }

  get trainer_lname(): string {
    return this._trainer_lname;
  }
}
