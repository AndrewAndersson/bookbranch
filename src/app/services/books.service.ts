import { Injectable } from '@angular/core';
import { Book } from '../models/Book';
import { of } from 'rxjs/observable/of';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BooksService {
  booksCollection: AngularFirestoreCollection<Book>;
  bookDoc: AngularFirestoreDocument<Book>;
  books: Observable<Book[]>;
  book: Observable<Book>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.booksCollection = this.afs.collection('books');
  }
  getBooks() {
    this.books = this.booksCollection.snapshotChanges().map(collection => {
      return collection.map(document => {
        const data = document.payload.doc.data() as Book;
        data.id = document.payload.doc.id;
        // console.log(data);
        return data;
      });
    });
    return this.books;
  }
  // getBookById(id: string) {
  //   const editBook = this.books.find( book => book.id === id);
  //   return of(editBook);
  // }
  addBook(book: Book) {
    return this.booksCollection.add(book);
  }
  editBook(book: Book) {
    this.bookDoc = this.afs.doc(`books/${book.id}`);
    return this.bookDoc.update(book);
  }
  deleteBook(id: string) {
    this.bookDoc = this.afs.doc(`books/${id}`);
    return this.bookDoc.delete();
  }

}
