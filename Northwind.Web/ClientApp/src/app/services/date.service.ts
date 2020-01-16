import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})

export class DateService {

  constructor() { }
  formatDate(dateString: any){
    var date = new Date(dateString);
    return  ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + date.getFullYear();
  }
}