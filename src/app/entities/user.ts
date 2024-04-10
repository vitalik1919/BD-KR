export enum Role {
  CUSTOMER,
  ADMIN,
  TRAINER
}

export class User {

  constructor(private _id : number, private _role : Role) {}

  set id(value: number) {
    this._id = value;
  }
  set role(value: Role) {
    this._role = value;
  }
  get id(): number {
    return this._id;
  }
  get role(): Role {
    return this._role;
  }

}
