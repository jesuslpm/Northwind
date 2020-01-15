import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'filter'
})

@Injectable({
  providedIn: 'root'
})

export class FilterPipe implements PipeTransform {

  /* 
    items: Array on which you are applying filter.
    fields: list of properties on which we are matching the value (search by values).
    value: actual value 
  */
  transform(items: any[], fields: any[], value: string): any[] {
    // if array is blank return blank array.
    if (!items) {
      return [];
    }

    // if search by values are empty then return array as it is.
    if (!fields || !value) {
      return items;
    }

    var filteredItems = [];
    items.filter(singleItem =>
       fields.map(field => {
        if(field !== undefined){
          // filter according to field type, if it is object then match its (Key, value) else match directly property value.
          if ((typeof (field) === "string" && singleItem[field].toString().toLowerCase().includes(value.toLowerCase()))
            || (typeof (field) === "object" && singleItem[field.KEY][field.VALUE].toString().toLowerCase().includes(value.toLowerCase()))) {
            // Check condition that if filtered array does contain the same item or not, if not then only push.
            if (!filteredItems.includes(singleItem)) {
              filteredItems.push(singleItem);
            }
          }
        }
        
      })
    );

    // Return filterd array.
    return filteredItems;
  }  

}
