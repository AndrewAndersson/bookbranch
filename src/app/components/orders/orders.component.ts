import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { Order } from '../../models/Order';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[];

  constructor(
    private salesService: SalesService,
    public flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
    this.salesService.getOrders().subscribe(data => {
      this.orders = data;
    });
  }

  changeStatus(order) {
    this.salesService.editOrder(order)
        .catch(err => {
          this.flashMessages.show(err.message, {
            cssClass: 'alert alert-danger',
            timeout: 5000,
            closeOnClick: true
          });
        });
  }
  saveChanges(order) {
    if (!order.isEdit) {
      this.salesService.editOrder(order)
        .then(() => {
          this.flashMessages.show('Edit successfully', {
            cssClass: 'alert alert-success',
            timeout: 5000,
            closeOnClick: true
          });
        })
        .catch(err => {
          this.flashMessages.show(err.message, {
            cssClass: 'alert alert-danger',
            timeout: 5000,
            closeOnClick: true
          });
        });
    }
  }

  deleteBooks(order, item) {
    order.item = order.items.splice(item, 1);
    this.salesService.editOrder(order)
        .then(() => {
          if (!order.items.length) {
            order.status = 'close';
          }
        })
        .catch(err => {
          this.flashMessages.show(err.message, {
            cssClass: 'alert alert-danger',
            timeout: 5000,
            closeOnClick: true
          });
        });
  }

  changeCountOfBooks(order) {
    order.isEdit = true;
    order.items.forEach(item => {
      item.sum = item.price * item.count;
    });
    order.total = order.items.reduce((sum, book) => sum += Number(book.sum), 0);
  }

}
