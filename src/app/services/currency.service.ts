import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Currency } from '../models/Currency';

@Injectable()
export class CurrencyService {
  currency: Currency[] = [
    {
      name: 'USD',
      isActive: true,
      coefficient: 1
    },
    {
      name: 'EUR',
      isActive: false,
      coefficient: 0.86
    },
    {
      name: 'GRB',
      isActive: false,
      coefficient: 0.78
    }
  ];
  private currencySource = new BehaviorSubject<Currency[]>(this.currency);
  selectedCurrency = this.currencySource.asObservable();

  constructor() { }

  selectCurrency(name: string) {
    this.currency = this.currency.map(item =>{
      item.name === name ? item.isActive = true : item.isActive = false;
      return item;
    });
    this.currencySource.next(this.currency);
  }

}
