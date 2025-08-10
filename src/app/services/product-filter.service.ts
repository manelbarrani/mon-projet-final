import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductFilterService {
  private categorySubject = new BehaviorSubject<string>('');
  private priceMaxSubject = new BehaviorSubject<number | null>(null);

  category$ = this.categorySubject.asObservable();
  priceMax$ = this.priceMaxSubject.asObservable();

  setCategory(category: string) {
    this.categorySubject.next(category);
  }

  setPriceMax(price: number | null) {
    this.priceMaxSubject.next(price);
  }
}
