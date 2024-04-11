export class Trainer {
  constructor(private _id : number, private _first_name : string, private _last_name : string,
              private _wage : number, private _specialty : string) {
  }

  get id(): number {
    return this._id;
  }

  get first_name(): string {
    return this._first_name;
  }

  get last_name(): string {
    return this._last_name;
  }

  get wage(): number {
    return this._wage;
  }

  get specialty(): string {
    return this._specialty;
  }
}
