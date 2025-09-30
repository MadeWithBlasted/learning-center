export class Category {
  private _id: number;
  private _name: string;

  constructor(category:{ id: number, name: string}) {
    this._id = category.id;
    this._name = category.name;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
}
