import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class ClientCheckoutService {
  private checkoutSours = new BehaviorSubject([]);
  checkoutEvent = this.checkoutSours.asObservable();

  constructor(
    public flashMessages: FlashMessagesService
  ) { }
  addCheckoutList(list) {
    this.checkoutSours.next(list);
  }

}
