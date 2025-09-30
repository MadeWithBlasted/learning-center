import {computed, Injectable, Signal, signal} from '@angular/core';
import {Category} from '../domain/model/category.entity';
import {Course} from '../domain/model/course.entity';
import {LearningApi} from '../infrastructure/learning-api';
import {retry} from 'rxjs';

@Injectable({providedIn: 'root'})
export class LearningStore {
  // Signals
  private readonly _categoriesSignal = signal<Category[]>([]);
  private readonly _coursesSignal = signal<Course[]>([]);
  private readonly _loadingSignal = signal<boolean>(false);
  private readonly _errorSignal = signal<string | null>(null);
  // Properties
  readonly categories = this._categoriesSignal.asReadonly();
  readonly courses = this._coursesSignal.asReadonly();
  readonly loading = this._loadingSignal.asReadonly();
  readonly error = this._errorSignal.asReadonly();
  readonly categoriesCount = computed(() => this.categories().length);
  readonly coursesCount = computed(() => this.courses().length);

  constructor(private learningApi: LearningApi) {
    // TODO: Load categories and courses from the API
  }

  getCategoryById(id: number | null | undefined): Signal<Category | undefined> {
    return computed(() => id ? this.categories().find(category => category.id === id) : undefined);
  }

  addCategory(category: Category): void {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.learningApi.createCategory(category).pipe(retry(2)).subscribe({
      next: createdCategory => {
        this._categoriesSignal.update(categories => [...categories, createdCategory]);
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to create category'));
        this._loadingSignal.set(false);
      }
    })
  }

  updateCategory(category: Category): void {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.learningApi.updateCategory(category).pipe(retry(2)).subscribe({
      next: updatedCategory => {
        this._categoriesSignal.update(categories =>
          categories.map(cat => cat.id === updatedCategory.id ? updatedCategory : cat));
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to update category'));
        this._loadingSignal.set(false);
      }
    });
  }

  deleteCategory(id: number): void {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.learningApi.deleteCategory(id).pipe(retry(2)).subscribe({
      next: () => {
        this._categoriesSignal.update(categories => categories.filter(category => category.id !== id));
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to delete category'));
        this._loadingSignal.set(false);
      }
    });
  }

  private formatError(error: any, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found') ? `${fallback}: Not Found` : error.message;
    }
    return fallback;
  }

}
