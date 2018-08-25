import { Component, OnInit } from '@angular/core';
import { IdService } from '../../services/id.service';
import { Book } from '../../models/Book';
import { BooksService } from '../../services/books.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DateService } from '../../services/date.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  newBook: Book;
  constructor(
    private idService: IdService,
    private booksService: BooksService,
    private router: Router,
    private flashMessages: FlashMessagesService,
    private dateService: DateService
  ) { }

  ngOnInit() {
    this.newBook = {
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
  }
  addNewBook() {
    this.newBook = Object.assign(this.newBook, {id: this.idService.generate()}, {date: this.dateService.getDate()});
    this.booksService.addBook(this.newBook)
          .then(data => {
            if (data) {
              this.router.navigate(['/panel']);
              this.flashMessages.show('Add Complete!!!', {
                cssClass: 'alert alert-success',
                showCloseBtn: true,
                timeout: 10000
              });
            }
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
