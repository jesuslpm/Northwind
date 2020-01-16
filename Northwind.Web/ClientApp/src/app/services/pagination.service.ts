import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class PaginationService {

  private messageSource = new BehaviorSubject([]);
  currentMessage = this.messageSource.asObservable();

  constructor() { }
  pageNumber = 1;
  perPageLimit = 10;
  pageWiseArray = [];
  sortingColumn:string = "";
  sortType:string = "";
  search:string = "";
  changePage(data){
    this.pageWiseArray = [];
    if(data.length == 0) {
      this.messageSource.next(this.pageWiseArray)
    }
    for(let j=((this.perPageLimit * this.pageNumber) - this.perPageLimit); 
            j<(this.perPageLimit * this.pageNumber); 
            j++){
      if(j < data.length){
        this.pageWiseArray.push(data[j]);
        this.messageSource.next(this.pageWiseArray);
      }
        
    }
  }

  //changePageLimit()
  changePageLimit(perPageLimit, data){
    this.perPageLimit = perPageLimit
    this.changePage(data);
  }


  // sortOrder() - Sort Orders according to column.
  sortOrder(columnName: string, data) {
    if (!this.sortingColumn || this.sortingColumn != columnName) {
      this.sortType = "ASC";
    }
    this.sortingColumn = columnName;
    if (!this.sortType || this.sortType === "DESC") {
      data.sort((a, b) => (a[columnName] > b[columnName]) ? 1 : -1);
      this.sortType = "ASC";
    } else {
      data.sort((a, b) => (a[columnName] > b[columnName]) ? -1 : 1);
      this.sortType = "DESC";
    }
    this.changePage(data);
  }


    // pageChanged() - Event is fired when page is changed.
  pageChanged(page, data) {
    this.pageNumber = page;
    this.changePage(data);
  }
}