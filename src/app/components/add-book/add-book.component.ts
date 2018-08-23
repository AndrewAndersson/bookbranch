import { Component, OnInit } from '@angular/core';
import { IdService } from '../../services/id.service';
import { Book } from '../../models/Book';
import { BooksService } from '../../services/books.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  newBook: Book = {
    name: '',
    id: '',
    author: '',
    description: '',
    link: [
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

  constructor(
    private idService: IdService,
    private booksService: BooksService,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {}
  addNewBook() {
    this.newBook = Object.assign(this.newBook, {id: this.idService.generate()});
    this.booksService.addBook(this.newBook).subscribe((data: Book) => {
      if (data) {
        this.router.navigate(['/panel']);
        this.flashMessages.show('Add Complete!!!', {
          cssClass: 'alert alert-success',
          showCloseBtn: true,
          timeout: 10000
        });
      }
    });
  }

}
