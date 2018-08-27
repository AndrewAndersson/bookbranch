import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/Book';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css']
})
export class ClientHomeComponent implements OnInit {
  books: Book[] = [];
  basketItems = [];

  constructor(
    public bookService: BooksService,
    public basketService: BasketService
  ) { }

  ngOnInit() {
    // Get all books
    this.bookService.getBooks().subscribe((data: Book[]) => {
      if (data) {
        this.books = data;
        if (this.basketItems.length) {
          this.basketItems.forEach(item => {
            this.books.forEach(book => {
              if (book.id === item.id) {
                book.isAddBasket = true;
              }
            });
          });
        }
      }
    });
    this.basketService.clearAllItemsEvent.subscribe(isClear => {
      if (isClear) {
        this.books.forEach(book => book.isAddBasket = false);
      }
    });
    this.basketService.deleteItemsEvent.subscribe(id => {
      if (id) {
        this.books.forEach(book => {
          if (book.id === id) {
            book.isAddBasket = false;
          }
        });
      }
    });
    this.basketService.getBasketItem().subscribe(items => {
      if (items.length) {
        this.basketItems = items;
      }
    });
  }
  addBook(book) {
    const newBasketItem = {
      id: book.id,
      price: book.price,
      name: book.name
    };
    this.basketService.addItem(newBasketItem).subscribe(item => {
      // message
    });
  }
  deleteBookFromBasket(id) {
    this.basketService.deleteItem(id);
  }
}
