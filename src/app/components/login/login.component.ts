import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
    this.authService.checkAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/panel']);
      }
    });
  }

  onSubmit() {
    this.authService.login(this.email, this.password)
        .then(user => {
          this.router.navigate(['/panel']);
          this.flashMessages.show('LogIn complete', {
            cssClass: 'alert alert-success',
            timeout: 10000,
            showCloseBtn: true
          });
        })
        .catch(err => {
          this.flashMessages.show(err.message, {
            cssClass: 'alert alert-danger',
            timeout: 10000,
            showCloseBtn: true
          });
        });
  }

}
