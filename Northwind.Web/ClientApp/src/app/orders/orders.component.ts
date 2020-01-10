import { Component, OnInit, OnDestroy,AfterViewInit,ViewChild, TemplateRef  } from '@angular/core';

import { CatalogClient, Product, 
  Category, Supplier, 
  OrdersClient, Order,CustomersClient, Customer, 
  EmployeesClient, EmployeeMinimal,
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
  employees: EmployeeMinimal[] = [];
  // shippers: Shipper[] = [];
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
    private employeeClient: EmployeesClient,
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
      this.getProducts();
      this.getCategories();
      this.getSuppliers();
      this.getEmployees();
      // this.getShippers();


      this.searchForm = this.fb.group({
        orderId:[null],
        customerIds: [''],
        orderDateFrom: [null]
      });

      this.advanceSearchForm = this.fb.group({
        customerIds: [[]],
        employeeIds: [[]],
        shipperIds: [[]],
        productIds: [[]],
        orderAmountFrom: [null],
        orderAmountTo: [null],
        orderDateFrom: [null],
        orderDateTo: [null],
        requiredDateFrom: [null],
        requiredDateTo: [null],
        shippedDateFrom: [null],
        shippedDateTo: [null],
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

  getProducts() {
    this.client.getProducts()
          .subscribe((products) => {
            if(products != null) {
              this.products = products;
            } else {
              this.toastr.error('Something went wrong!', 'Error!');      
            }
    },(err) => {
      this.toastr.error('Something went wrong!', 'Error!');
    });
  }

  getCategories() {
    this.client.getCategories()
          .subscribe(categories => {
            if(categories != null) {
              this.categories = categories;
            } else {
              this.toastr.error('Something went wrong!', 'Error!');      
            }
    },(err) => {
        this.toastr.error('Something went wrong!', 'Error!');
    });
  }

  getSuppliers() {
    this.client.getSuppliers()
          .subscribe(suppliers => {
            if(suppliers != null) {
              this.suppliers = suppliers;
            } else {
              this.toastr.error('Something went wrong!', 'Error!');      
            }
    },(err) => {
      this.toastr.error('Something went wrong!', 'Error!');
    });
  }

  getEmployees() {
    this.employeeClient.getAllEmployees()
          .subscribe(emplyees => {
            if(emplyees != null) {
              console.log('emplyees', emplyees);
              this.employees = emplyees;
            } else {
              this.toastr.error('Something went wrong!', 'Error!');      
            }
    },(err) => {
      this.toastr.error('Something went wrong!', 'Error!');
    });
  }

  /*getShippers() {
    this.shipperClient.getShippers()
          .subscribe(shippers => {
            if(shippers != null) {
              this.shippers = shippers;
            } else {
              this.toastr.error('Something went wrong!', 'Error!');      
            }
    },(err) => {
      this.toastr.error('Something went wrong!', 'Error!');
    });
  }*/

  rerender(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
     this.dtTrigger.next();
    });
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

  advanceSearchSubmit() {
    
    if(this.advanceSearchForm.valid) {
      let searchData:any = {};
      searchData = this.advanceSearchForm.value;
      if(searchData.orderDateFrom != null){
        searchData.orderDateFrom = moment(searchData.orderDateFrom).format("YYYY-MM-DD");
      }
      if(searchData.orderDateTo != null){
        searchData.orderDateTo = moment(searchData.orderDateTo).format("YYYY-MM-DD");
      }
      if(searchData.requiredDateFrom != null){
        searchData.requiredDateFrom = moment(searchData.requiredDateFrom).format("YYYY-MM-DD");
      }
      if(searchData.requiredDateTo != null){
        searchData.requiredDateTo = moment(searchData.requiredDateTo).format("YYYY-MM-DD");
      }
      if(searchData.shippedDateFrom != null){
        searchData.shippedDateFrom = moment(searchData.shippedDateFrom).format("YYYY-MM-DD");
      }
      if(searchData.shippedDateTo != null) {
        searchData.shippedDateTo = moment(searchData.shippedDateTo).format("YYYY-MM-DD");
      }

      searchData.customerIds = searchData.customerIds.filter(function (el) {
        return el != "";
      });

      searchData.employeeIds = searchData.employeeIds.filter(function (el) {
        return el != "";
      });
      
      searchData.shipperIds = searchData.shipperIds.filter(function (el) {
        return el != "";
      });

      searchData.productIds = searchData.productIds.filter(function (el) {
        return el != "";
      });
      
      searchData.orderId = null;
      searchData.productIds = [];

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

  openAdvanceSearchModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-lg right-side-modal'});
  }
  onOrderDateFromChange(value: Date) {
    // this.advanceSearchForm.patchValue({
    //   orderDateTo: ''
    // })
    if(value != null) {
      this.isDisabledOrderDateTo = false;
    } else {
      this.isDisabledOrderDateTo = true;
    }
    this.minOrderDateTo = value;

    if(value != null) {
      this.advanceSearchForm.controls['orderDateTo'].setValidators([Validators.required])
    } else {
      this.advanceSearchForm.controls['orderDateTo'].setValidators(null)
    }
    this.advanceSearchForm.controls['orderDateTo'].updateValueAndValidity();


    if(this.advanceSearchForm.value.orderDateTo == null || this.advanceSearchForm.value.orderDateTo == '') {
        this.advanceSearchForm.patchValue({
          orderDateTo: value
        })
    }

    // if(this.advanceSearchForm.value.orderDateTo!= null && moment(this.advanceSearchForm.value.orderDateTo) > moment(this.advanceSearchForm.value.orderAmountFrom)){
    //   this.advanceSearchForm.patchValue({
    //     orderDateTo: ''
    //   })
    // }
  }
  onOrderDateToChange(value: Date) {
    if(this.isDisabledOrderDateTo) {
      // this.advanceSearchForm.patchValue({
      //   orderDateTo: ''
      // })
    }

    if(value != null) {
      this.advanceSearchForm.controls['orderAmountFrom'].setValidators([Validators.required])
    } else {
      this.advanceSearchForm.controls['orderAmountFrom'].setValidators(null)
    }
    this.advanceSearchForm.controls['orderAmountFrom'].updateValueAndValidity()
  }

  onRequiredDateFromChange(value: Date) {
    // this.advanceSearchForm.patchValue({
    //   requiredDateTo: ''
    // })
    if(value != null) {
      this.isDisabledRequiredDateTo = false;
    } else {
      this.isDisabledRequiredDateTo = true;
    }
    this.minRequiredDateTo = value;

    if(value != null) {
      this.advanceSearchForm.controls['requiredDateTo'].setValidators([Validators.required])
    } else {
      this.advanceSearchForm.controls['requiredDateTo'].setValidators(null)
    }
    this.advanceSearchForm.controls['requiredDateTo'].updateValueAndValidity()


    if(this.advanceSearchForm.value.requiredDateTo == null || this.advanceSearchForm.value.requiredDateTo == '') {
      this.advanceSearchForm.patchValue({
        requiredDateTo: value
      })
    }

  }
  onRequiredDateToChange(value: Date) {
    if(this.isDisabledRequiredDateTo) {
      // this.advanceSearchForm.patchValue({
      //   requiredDateTo: ''
      // })
    }
    if(value != null) {
      this.advanceSearchForm.controls['requiredDateFrom'].setValidators([Validators.required])
    } else {
      this.advanceSearchForm.controls['requiredDateFrom'].setValidators(null)
    }
    this.advanceSearchForm.controls['requiredDateFrom'].updateValueAndValidity()
  }

  onShippedDateFromChange(value: Date) {
    // this.advanceSearchForm.patchValue({
    //   shippedDateTo: ''
    // })
    if(value != null) {
      this.isDisabledShippedDateTo = false;
    } else {
      this.isDisabledShippedDateTo = true;
    }
    this.minShippedDateTo = value;

    if(value != null) {
      this.advanceSearchForm.controls['shippedDateTo'].setValidators([Validators.required])
    } else {
      this.advanceSearchForm.controls['shippedDateTo'].setValidators(null)
    }
    this.advanceSearchForm.controls['shippedDateTo'].updateValueAndValidity()

    if(this.advanceSearchForm.value.shippedDateTo == null || this.advanceSearchForm.value.shippedDateTo == '') {
      this.advanceSearchForm.patchValue({
        shippedDateTo: value
      })
    }
  }
  onShippedDateToChange(value: Date) {
    if(this.isDisabledShippedDateTo) {
      // this.advanceSearchForm.patchValue({
      //   shippedDateTo: ''
      // })
    }
    if(value != null) {
      this.advanceSearchForm.controls['shippedDateFrom'].setValidators([Validators.required])
    } else {
      this.advanceSearchForm.controls['shippedDateFrom'].setValidators(null)
    }
    this.advanceSearchForm.controls['shippedDateFrom'].updateValueAndValidity()
  }

  onOrderAmountFromChange() {
    if(this.advanceSearchForm.value.orderAmountFrom != "") {
      this.advanceSearchForm.controls['orderAmountTo'].setValidators([Validators.required])
    } else {
      this.advanceSearchForm.controls['orderAmountTo'].setValidators(null)
    }
    this.advanceSearchForm.controls['orderAmountTo'].updateValueAndValidity()
  }

  onOrderAmountToChange() {
    this.advanceSearchForm.setValidators(this.amountValidation);
    this.advanceSearchForm.updateValueAndValidity();
  }

  amountValidation(group: FormGroup):any {
    let orderAmountFrom = group.get('orderAmountFrom').value;
    let orderAmountTo = group.get('orderAmountTo').value;
    if(orderAmountTo > orderAmountFrom) {
      return {'invalidSearchAmountTo': true}
    } 
    return null;
  }
}
