import { Component, OnInit, OnDestroy,ViewChild  } from '@angular/core';
import { CatalogClient, OrdersClient, Order
        } from '../clients';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {

  
  orders: Order[] = [];
  dtOptions: any = {};
  dtTrigger: any = new Subject();
  @ViewChild(DataTableDirective,{static: false}) datatableElement: DataTableDirective;

  currentProduct:any = {};
  minOrderDateTo: any = null;
  isDisabledOrderDateTo: Boolean = true;
  minRequiredDateTo: any = null;
  isDisabledRequiredDateTo: Boolean = true;
  minShippedDateTo: any = null;
  isDisabledShippedDateTo: Boolean = true;
  isProductFormSubmitted: Boolean = false;
  isOrderFormSubmitted: Boolean = false;
  orderProducts: any = [];
  netTotal: any = 0;
  productEditMode: Boolean = false;
  orderEditMode: Boolean = false;
  
  constructor(
    private client: CatalogClient,
    private ordersClient: OrdersClient,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
      this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 10,
          dom: 'lBfrtip',
          buttons: [
            {
              extend: 'excel',
              text: 'Export to Excel',
              exportOptions: {
                columns: [ 0, 1,2,3,4,5,6,7] //Your Colume value those you want
              },
              filename: function(){
                var d = new Date();
                var n = d.getTime();
                return 'Orders-' + moment(d).format('DD-MM-YYYY-HH:mm:ss');
              }
            }
          ],
          'columnDefs': [ 
            { 'type': 'date', 'targets': 4 },
            { 'type': 'date', 'targets': 5 },
            { 'type': 'date', 'targets': 6 } 
          ],
      };
      this.getOrders(true);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    $.fn['dataTable'].ext.search.pop();
  }

  getOrders(loadFirstTime = false) {
    this.ordersClient.getAllOrders()
          .subscribe((orders) => {
            if(orders != null) {
              console.log('orders',orders);
              this.orders = orders;
              this.dtTrigger.next();
            } else {
              this.toastr.error('Something went wrong!', 'Error!');      
            }
    },(err) => {
      this.toastr.error('Something went wrong!', 'Error!');
    });
  }


  rerender(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
     // this.dtTrigger.next();
    });
  }
}
