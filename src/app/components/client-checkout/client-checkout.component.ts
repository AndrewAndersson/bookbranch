import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../services/basket.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { SalesService } from '../../services/sales.service';

@Component({
  selector: 'app-client-checkout',
  templateUrl: './client-checkout.component.html',
  styleUrls: ['./client-checkout.component.css']
})
export class ClientCheckoutComponent implements OnInit {
  basketItems = [];
  name = '';
  phone = '';
  email = '';
  addressIsVisible = false;
  totalSum = 0;

  constructor(
    public basketService: BasketService,
    public flashMessages: FlashMessagesService,
    private router: Router,
    public salesService: SalesService
  ) { }

  ngOnInit() {
    this.basketService.getBasketItem().subscribe(items => {
      if (!items.length) {
        this.router.navigate(['/']);
      } else {
        this.basketItems = items;
        this.totalSum = this.basketItems.reduce((sum: number, item) => sum += Number(item.sum), 0);
      }
    });
  }
  onChangeItemCount(item) {
    item.sum = item.price * item.count;
    this.totalSum = this.basketItems.reduce((sum, order) => {
      return sum += Number(order.sum);
    }, 0);
  }
  deleteItem(id) {
    this.basketService.deleteItem(id);
    this.totalSum = this.basketItems.reduce((sum, order) => {
      return sum += Number(order.sum);
    }, 0);
    if (!this.basketItems.length) {
      this.flashMessages.show('Your orders list is empty. Please go on to home tab', {
        cssClass: 'alert alert-warning',
        showCloseBtn: true,
        timeout: 10000
      });
    }
  }
  onSubmit() {
    const newOrder = {
      name: this.name,
      phone: this.phone,
      email: this.email,
      items: this.basketItems,
      status: 'processing',
      total: this.totalSum
    };
    this.salesService.addNewOrder(newOrder)
          .then(() => {
            this.router.navigate(['/']);
            this.basketItems.splice(0, this.basketItems.length);
            this.flashMessages.show('Ваш заказ оформлен. Ожидайте пока с Вами свяжуться.', {
              cssClass: 'alert alert-success',
              showCloseBtn: true,
              timeout: 10000
            });
          })
          .catch(err => {
            this.flashMessages.show(err.message, {
              cssClass: 'alert alert-danger',
              showCloseBtn: true,
              timeout: 10000
            });
          });
  }

}
