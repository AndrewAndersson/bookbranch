import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Book } from '../models/Book';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class BasketService {
  purchaseList: Book[] = [];
  private clearSource = new BehaviorSubject(false);
  clearAllItemsEvent = this.clearSource.asObservable();
  private deleteSource = new BehaviorSubject('');
  deleteItemsEvent = this.deleteSource.asObservable();

  constructor() {}
  getBasketItem() {
    return of(this.purchaseList);
  }
  addItem(book) {
    this.purchaseList.push(book);
    return of(book);
  }
  deleteItem(id) {
    this.purchaseList.forEach((item, index) => {
      if (item.id === id) {
        this.purchaseList.splice(index, 1);
      }
    });
    this.deleteSource.next(id);
  }
  clearBasketAll() {
    this.purchaseList.splice(0, this.purchaseList.length);
    this.clearSource.next(true);
  }

}
