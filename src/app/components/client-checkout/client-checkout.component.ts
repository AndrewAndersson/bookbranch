import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../services/basket.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientCheckoutService } from '../../services/client-checkout.service';
import { isNumber } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-checkout',
  templateUrl: './client-checkout.component.html',
  styleUrls: ['./client-checkout.component.css']
})
export class ClientCheckoutComponent implements OnInit {
  basketItems = [];

  constructor(
    public basketService: BasketService,
    public flashMessages: FlashMessagesService,
    public clientCheckoutService: ClientCheckoutService,
    private router: Router
  ) { }

  ngOnInit() {
    this.basketService.getBasketItem().subscribe(items => {
      if (items.length) {
        this.basketItems = items;
        this.basketItems.forEach(item => {
          if (!item.amount) {
            item = Object.assign(item, {amount: 1});
          }
        });
      } else if (!this.basketItems.length) {
        this.flashMessages.show('Your orders list is empty. Please go on to home tab', {
          cssClass: 'alert alert-warning',
          showCloseBtn: true,
          timeout: 10000
        });
      }
    });
  }
  deleteItem(id) {
    this.basketService.deleteItem(id);
    if (!this.basketItems.length) {
      this.flashMessages.show('Your orders list is empty. Please go on to home tab', {
        cssClass: 'alert alert-warning',
        showCloseBtn: true,
        timeout: 10000
      });
    }
  }
  checkOut() {
    this.router.navigate(['/']);
    const sendList = [...this.basketItems];
    this.clientCheckoutService.addCheckoutList(sendList);
    this.basketItems.splice(0, this.basketItems.length);
    this.flashMessages.show('The order is successful', {
      cssClass: 'alert alert-success',
      showCloseBtn: true,
      timeout: 10000
    });
  }

}
