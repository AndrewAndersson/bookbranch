import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/Book';
import { CurrencyService } from '../../services/currency.service';
import { Currency } from '../../models/Currency';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientCheckoutService } from '../../services/client-checkout.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  books: Book[];
  searchingResult: Book[] = [];
  searchText: string;
  currentCurrency: Currency;
  orders = [];

  constructor(
    public bookService: BooksService,
    public currencyService: CurrencyService,
    public flashMessagesService: FlashMessagesService,
    public clientCheckoutService: ClientCheckoutService
  ) { }

  ngOnInit() {
    // Get all books
    this.bookService.getBooks().subscribe((data: Book[]) => {
      if (data) {
        this.books = data;
      }
    });
    // subscribe on currency update
    this.currencyService.selectedCurrency.subscribe(currency => {
      this.currentCurrency = Object.create(currency.find(obj => obj.isActive));
    });
    // get orders
    this.clientCheckoutService.checkoutEvent.subscribe(items => {
      this.orders = items;
      console.log('get orders in admin panel', this.orders);
    });

  }
  searchBook() {
    this.searchingResult = this.books.filter(book => book.name.toLowerCase().indexOf(this.searchText) !== -1);
  }
  deleteBook(id) {
    this.bookService.deleteBook(id)
          .then(book => {
            this.flashMessagesService.show('delete complete!', {
              cssClass: 'alert alert-success',
              showCloseBtn: true,
              timeout: 10000
            });
          });
  }

}
