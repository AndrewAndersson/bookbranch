import { Injectable } from '@angular/core';
import { Book } from '../models/Book';
import { of } from 'rxjs/observable/of';

@Injectable()
export class BooksService {
  books: Book[] = [
    {
      id: '71e9a7bc-fbe8-4384-842f-65a17aed5e0e',
      name: 'Выразительный JavaScript',
      author: 'Marijn Haverbeke',
      description: 'lorem lorem',
      link: [
        {
          type: 'pdf',
          link: 'link'
        },
        {
          type: 'epub',
          link: 'link'
        }
      ]
    }
  ];

  constructor() { }
  getBooks() {
    return of(this.books);
  }
  getBookById(id: string) {
    const editBook = this.books.find( book => book.id === id);
    return of(editBook);
  }
  addBook(book: Book) {
    this.books.unshift(book);
    return of(book);
  }
  editBook(book: Book) {
    this.books = this.books.map((data: Book) => {
      if (data.id === book.id) {
        data = book;
      }
      return data;
    });
    return of(book);
  }
  deleteBook(id: string) {
    //
  }

}
