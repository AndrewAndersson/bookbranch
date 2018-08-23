import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/Book';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  book: Book;
  bookId: string;

  constructor(
    private bookService: BooksService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
    this.bookId = this.activatedRoute.snapshot.params['id'];
    this.bookService.getBookById(this.bookId).subscribe((data: Book) => {
      this.book = data;
    });
  }

  editBook() {
    const updateBook = Object.assign({}, this.book);
    this.bookService.editBook(updateBook).subscribe((item: Book) => {
      if (item) {
        this.router.navigate(['/panel']);
        this.flashMessages.show('Edit Complete!!!', {
          cssClass: 'alert alert-success',
          showCloseBtn: true,
          timeout: 10000
        });
      }
    });
  }

}
