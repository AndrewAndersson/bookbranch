import { Injectable } from '@angular/core';

@Injectable()
export class DateService {

  constructor() { }
  getDate() {
    const now = new Date();
    return now;
  }


}
