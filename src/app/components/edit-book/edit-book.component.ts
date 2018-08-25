import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/Book';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DateService } from '../../services/date.service';

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
    private flashMessages: FlashMessagesService,
    private dateService: DateService
  ) { }

  ngOnInit() {
    this.book = {
      name: '',
      id: '',
      author: '',
      date: '',
      description: '',
      price: 0,
      links: [
        {
          type: 'pdf',
          link: ''
        },
        {
          type: 'epub',
          link: ''
        }
      ]
    };
    this.bookId = this.activatedRoute.snapshot.params['id'];
    this.bookService.getBooks().subscribe((data: Book[]) => {
      this.book = data.find(item => item.id === this.bookId);
    });
  }

  editBook() {
    const updateBook = Object.assign({}, this.book, {date: this.dateService.getDate()});
    this.bookService.editBook(updateBook)
          .then(item => {
              this.router.navigate(['/panel']);
              this.flashMessages.show('Edit Complete!!!', {
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
