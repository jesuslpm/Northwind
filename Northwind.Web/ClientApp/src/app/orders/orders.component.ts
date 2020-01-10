import { Component, OnInit, OnDestroy,AfterViewInit,ViewChild, TemplateRef  } from '@angular/core';
import { CatalogClient, Product, 
  Category, Supplier, 
  OrdersClient, Order,CustomersClient, Customer
} from '../clients';

import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy, AfterViewInit {

  products: Product[] = [];
  orders: Order[] = [];
  categories: Category[] = [];
  suppliers: Supplier[] = [];
  customers: Customer[] = [];
  dtOptions: any = {};
  dtTrigger: any = new Subject();
  @ViewChild(DataTableDirective,{static: false}) datatableElement: DataTableDirective;

  searchForm: FormGroup;
  advanceSearchForm: FormGroup;
  modalRef: BsModalRef;
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
    private customerClient: CustomersClient,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private toastr: ToastrService
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
      };
      
      
      this.getCustomers();

      this.searchForm = this.fb.group({
        orderId:[null],
        customerIds: [''],
        orderDateFrom: [null]
      });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    $.fn['dataTable'].ext.search.pop();
  }

  getOrders(loadFirstTime = false) {
    this.ordersClient.getAllOrders()
          .subscribe((orders) => {
            if(orders != null) {
              this.orders = orders;
              this.dtTrigger.next();
            } else {
              this.toastr.error('Something went wrong!', 'Error!');      
            }
    },(err) => {
      this.toastr.error('Something went wrong!', 'Error!');
    });
  }

  getCustomers() {
    this.customerClient.getAllCustomers()
          .subscribe(customers => {
            if(customers != null) {
              this.customers = customers;
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
     this.dtTrigger.next();
    });
  }

  advanceSearchSubmit() {
    if(this.advanceSearchForm.valid) {
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.draw();
        this.modalRef.hide();
      });
    } else {
      return false;
    }
  }

  searchFormSubmit() {
    if(this.searchForm.valid) {
      let searchData:any = {};
      if(this.searchForm.value.customerIds != "") {
        searchData.customerIds = [this.searchForm.value.customerIds];
      } else {
        searchData.customerIds = [];
      }
      
      if((this.searchForm.value.orderId == null) || (this.searchForm.value.orderId == '')){
        searchData.orderId = null;
      } else {
        searchData.orderId = +this.searchForm.value.orderId;
      }
      
      if(this.searchForm.value.orderDateFrom != null) {
        searchData.orderDateFrom = moment(this.searchForm.value.orderDateFrom).format("YYYY-MM-DD");
        searchData.orderDateTo = searchData.orderDateFrom;
      } else {
        searchData.orderDateFrom =  null;
        searchData.orderDateTo =  null;
      }
      
      searchData.employeeIds = [];
      searchData.shipperIds = [];
      searchData.productIds= [];
      searchData.orderAmountFrom =  null;
      searchData.orderAmountTo = null;
      searchData.requiredDateFrom = null;
      searchData.requiredDateTo = null;
      searchData.shippedDateFrom = null;
      searchData.shippedDateTo  = null;

      this.ordersClient.search(searchData)
          .subscribe(orders => {
            if(orders != null) {
              this.orders = orders;
              //this.dtTrigger.next();
              this.rerender();
            } else {
              this.toastr.error('Something went wrong!', 'Error!');      
            }
      },(err) => {
        this.toastr.error('Something went wrong!', 'Error!');
      });
    } else {
      return false;
    }
  }
}
