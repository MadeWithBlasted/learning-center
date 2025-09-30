import {Category} from './category.entity';

export class Course {
  private _id: number;
  private _title: string;
  private _description: string;
  private _categoryId: number;
  private _category: Category | null;

  constructor(course:{ id: number, title: string, description: string, categoryId: number, category?: Category}) {
    this._id = course.id;
    this._title = course.title;
    this._description = course.description;
    this._categoryId = course.categoryId;
    this._category = course.category ?? null;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get categoryId(): number {
    return this._categoryId;
  }

  set categoryId(value: number) {
    this._categoryId = value;
  }

  get category(): Category | null {
    return this._category;
  }

  set category(value: Category | null) {
    this._category = value;
  }
}
