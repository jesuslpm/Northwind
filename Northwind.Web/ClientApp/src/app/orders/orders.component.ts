import { DateService } from './../services/date.service';
import { PaginationService } from './../services/pagination.service';
import { Component, OnInit, OnDestroy,AfterViewInit,ViewChild, TemplateRef  } from '@angular/core';
import { CatalogClient, Product, 
  Category, Supplier, 
  OrdersClient, Order,CustomersClient, Customer, 
  EmployeesClient, EmployeeMinimal,ShippersClient, Shipper, OrderCriteria
} from '../clients';

import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { validatePostiveInteger, validatePositiveDecimal } from '../custom-validations/validations';
import { ExportService } from '../services/export.service';
import { FilterPipe } from '../pipes/filter.pipe';
import { TabDirective } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy, AfterViewInit {

  products: Product[] = [];
  productsArray = [];
  orders: Order[] = [];
  currentOrder: Order;
  orderFromSameCustomer: Order[] = [];
  allOrders: Order[] = [];
  categories: Category[] = [];
  suppliers: Supplier[] = [];
  customers: Customer[] = [];
  customersArray = [];
  employees: EmployeeMinimal[] = [];
  employeesArray = [];
  shippers: Shipper[] = [];
  shippersArray = [];


  searchForm: FormGroup;
  advanceSearchForm: FormGroup;
  advanceSearchSubmitted:Boolean= false;
  productForm: FormGroup;
  orderForm: FormGroup;
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
  orderEditMode: Boolean = false;
  productEditMode: Boolean = false;
  currentOrderProducts: Product[] = [];
  existProduct:Boolean = false;
  /* New table */
  /*pageNumber = 1;
  pageWiseArray = [];
  sortType:string = "";*/
  perPageLimit = 10;
  sortingColumn:string = "";
  search:string = "";
  pageWiseArray = [];
  dataTableHeaders=['Order Id', 'Customer Name', 'Employee', 'Shipper',
  'Order Date', 'Required Date', 'Shipped Date', 'Order Total $'];
  dataColumns=['orderId', 'customerName', 'employeeFullName', 'shipName',
  'orderDate', 'requiredDate', 'shippedDate', 'orderTotal'];
  /* */
  constructor(
    private client: CatalogClient,
    private ordersClient: OrdersClient,
    private customerClient: CustomersClient,
    private employeeClient: EmployeesClient,
    private shipperClient: ShippersClient,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private exportService:ExportService,
    public filterPipe:FilterPipe,
    private paginationService:PaginationService,
    private dateService:DateService,
    
  ) { }

  ngOnInit() {
      
      this.getCustomers();
      this.getProducts();
      this.getCategories();
      this.getSuppliers();
      this.getEmployees();
      this.getShippers();


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

      this.orderForm = this.fb.group({
        orderId:[''],
        customerId: ['',[Validators.required]],
        shipName: [''],
        shipTitle: [''],
        shipAddress: [''],
        shipCity: [''],
        shipRegion: [''],
        shipPostalCode: [''],
        shipCountry: [''],
        shipPhone: [''],
        shipFax: [''],
        employeeId: ['',[Validators.required]],
        shipVia: ['',[Validators.required]],
        requiredDate: ['',[Validators.required]],
        shippedDate: ['',[Validators.required]]
      });

      this.productForm = this.fb.group({
        productId: ['', [Validators.required]],
        quantity: ['', [Validators.required, validatePostiveInteger]],
        discount: ['',[validatePositiveDecimal]]
      });

      this.paginationService.currentMessage.subscribe((newData) =>{
        this.pageWiseArray = newData
      });
      
  }

  ngAfterViewInit(): void {
    this.pageWiseArray = [];  
  }

  ngOnDestroy(): void {
    
  }

  /*getOrders(loadFirstTime = false) {
    this.ordersClient.getAllOrders()
          .subscribe((orders) => {
            if(orders != null) {
              this.orders = orders;
            } else {
              this.toastr.error('Something went wrong!', 'Error!');      
            }
    },(err) => {
      this.toastr.error('Something went wrong!', 'Error!');
    });
  }*/

  getCustomers() {
    this.customerClient.getAllCustomers()
          .subscribe(customers => {
            if(customers != null) {
              this.customers = customers;
              this.customersArray = this.generateCustomerArray();
            } else {
              this.toastr.error('Something went wrong!', 'Error!');      
            }
    },(err) => {
      this.toastr.error('Something went wrong!', 'Error!');
    });
  }
  
  generateCustomerArray() {
    return this.customers.map(function(c) {
      return {'id': c['customerId'],'name':c['contactName']};
    });
  }

  getProducts() {
    this.client.getProducts()
          .subscribe((products) => {
            if(products != null) {
              this.products = products;
              this.currentOrderProducts = products;
              this.productsArray = this.generateProductArray();
            } else {
              this.toastr.error('Something went wrong!', 'Error!');      
            }
    },(err) => {
      this.toastr.error('Something went wrong!', 'Error!');
    });
  }

  generateProductArray() {
    return this.products.map(function(c) {
      return {'id': c['productId'],'name':c['productName']};
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
              this.employees = emplyees;
              this.employeesArray = this.generateEmployeeArray();
            } else {
              this.toastr.error('Something went wrong!', 'Error!');      
            }
    },(err) => {
      this.toastr.error('Something went wrong!', 'Error!');
    });
  }

  generateEmployeeArray() {
    return this.employees.map(function(c) {
      return {'id': c['employeeId'],'name':c['employeeFullName']};
    });
  }

  getShippers() {
    this.shipperClient.getAllShippers()
          .subscribe(shippers => {
            if(shippers != null) {
              this.shippers = shippers;
              this.shippersArray = this.generateShippersArray();
            } else {
              this.toastr.error('Something went wrong!', 'Error!');      
            }
    },(err) => {
      this.toastr.error('Something went wrong!', 'Error!');
    });
  }
  generateShippersArray() {
    return this.shippers.map(function(c) {
      return {'id': c['shipperId'],'name':c['companyName']};
    });
  }


  searchFormSubmit() {
    if(this.searchForm.valid) {
      let searchData: OrderCriteria = {};
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
        //searchData.orderDateFrom = moment(this.searchForm.value.orderDateFrom).format("YYYY-MM-DD");
        //searchData.orderDateFrom = new Date(this.searchForm.value.orderDateFrom);
        //searchData.orderDateFrom = new Date();

        searchData.orderDateFrom = new Date((<Date>this.searchForm.value.orderDateFrom).setHours(0, 0, 0, 0));
        searchData.orderDateTo = searchData.orderDateFrom;
      } else {
        searchData.orderDateFrom =  null;
        searchData.orderDateTo =  null;
      }
      
     /* searchData.employeeIds = [];
      searchData.shipperIds = [];
      searchData.productIds= [];
      searchData.orderAmountFrom =  null;
      searchData.orderAmountTo = null;
      searchData.requiredDateFrom = null;
      searchData.requiredDateTo = null;
      searchData.shippedDateFrom = null;
      searchData.shippedDateTo  = null;*/

      this.ordersClient.search(searchData)
          .subscribe(orders => {
            if(orders != null) {
              let allOrders: any = orders;
              allOrders.filter(x => {
                x.orderDate = this.dateService.formatDate(x.orderDate);
                x.requiredDate = this.dateService.formatDate(x.requiredDate);
                x.shippedDate = this.dateService.formatDate(x.shippedDate);
                x.orderTotal = (x.orderTotal == null) ? 0.00 : x.orderTotal.toFixed(2);
                x.orderTotal = "$ " + x.orderTotal;
              })
              this.orders = allOrders;
              this.allOrders = this.orders;
              this.paginationService.changePage(this.orders);
              //this.changePage();
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
    this.advanceSearchSubmitted = true;
    if(this.advanceSearchForm.errors == null) {
      let searchData:OrderCriteria = {};
      searchData = this.advanceSearchForm.value;
      if(searchData.orderDateFrom != null){
        //searchData.orderDateFrom = moment(searchData.orderDateFrom).format("YYYY-MM-DD");
        searchData.orderDateFrom = new Date((<Date>searchData.orderDateFrom).setHours(0, 0, 0, 0));
      }
      if(searchData.orderDateTo != null){
        //searchData.orderDateTo = moment(searchData.orderDateTo).format("YYYY-MM-DD");
        searchData.orderDateTo = new Date((<Date>searchData.orderDateTo).setHours(0, 0, 0, 0));
      }
      if(searchData.requiredDateFrom != null){
        //searchData.requiredDateFrom = moment(searchData.requiredDateFrom).format("YYYY-MM-DD");
        searchData.requiredDateFrom = new Date((<Date>searchData.requiredDateFrom).setHours(0, 0, 0, 0));
      }
      if(searchData.requiredDateTo != null){
        //searchData.requiredDateTo = moment(searchData.requiredDateTo).format("YYYY-MM-DD");
        searchData.requiredDateTo = new Date((<Date>searchData.requiredDateTo).setHours(0, 0, 0, 0));
      }
      if(searchData.shippedDateFrom != null){
        //searchData.shippedDateFrom = moment(searchData.shippedDateFrom).format("YYYY-MM-DD");
        searchData.shippedDateFrom = new Date((<Date>searchData.shippedDateFrom).setHours(0, 0, 0, 0));
      }
      if(searchData.shippedDateTo != null) {
        //searchData.shippedDateTo = moment(searchData.shippedDateTo).format("YYYY-MM-DD");
        searchData.shippedDateTo = new Date((<Date>searchData.shippedDateTo).setHours(0, 0, 0, 0));
      }

      if(searchData.customerIds != null){
        searchData.customerIds = searchData.customerIds.filter(function (el) {
          return el != "";
        });
      } else {
        searchData.customerIds = [];
      }
      
      if(searchData.employeeIds != null) {
        searchData.employeeIds = searchData.employeeIds.filter(function (el) {
          return el != undefined;
        }); 
      } else {
        searchData.employeeIds = [];
      }
      
      if(searchData.shipperIds != null) {
        searchData.shipperIds = searchData.shipperIds.filter(function (el) {
          return el != undefined;
        });
      } else {
        searchData.shipperIds = [];
      }
      
      if(searchData.productIds != null) {
        searchData.productIds = searchData.productIds.filter(function (el) {
          return el != undefined;
        });
      } else {
        searchData.productIds = [];
      }

      
      searchData.orderId = null;
      //searchData.productIds = [];
      this.ordersClient.search(searchData)
          .subscribe(orders => {
            if(orders != null) {
              let allOrders: any = orders;
              allOrders.filter(x => {
                x.orderDate = this.dateService.formatDate(x.orderDate);
                x.requiredDate = this.dateService.formatDate(x.requiredDate);
                x.shippedDate = this.dateService.formatDate(x.shippedDate);
                x.orderTotal = (x.orderTotal == null) ? 0.00 : x.orderTotal.toFixed(2);
                x.orderTotal = "$ " + x.orderTotal;
              })
              this.orders = allOrders;
              this.allOrders = this.orders;
              
              this.paginationService.changePage(this.orders);
              //this.changePage();
              this.modalRef.hide();
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
    this.modalRef = this.modalService.show(template, {class: 'modal-lg right-side-modal product-modal big'});
  }
  onOrderDateFromChange(value: Date) {
    console.log("Order Date From: %o", value);
    // var d = new Date(value.getTime() + value.getTimezoneOffset() * 60 * 1000);
    // console.log("Order date + timeoffset %o", d);
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
    if(this.advanceSearchForm.value.orderAmountFrom != null) {
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
    if(orderAmountFrom != null && orderAmountTo != null) {
      if(orderAmountTo < orderAmountFrom) {
        return {'invalidSearchAmountTo': true}
      } 
      return null; 
    } else {
      return null; 
    }
  }
  clearSearch() {
    this.advanceSearchSubmitted = false;
    this.advanceSearchForm.reset();
  }


  openOrderModal(template: TemplateRef<any>,isEdit=false, orderId=0) {
    this.orderEditMode = isEdit;
    this.clearModalData();
    if(isEdit) {
      this.ordersClient.getWholeOrder(orderId)
        .subscribe((order) => {
          if(order != null) {
            this.currentOrder = order;
            this.orderForm.patchValue({
              orderId: order.orderId,
              customerId: order.customerId,
              shipName: order.shipName,
              shipTitle: order.shipTitle,
              shipAddress: order.shipAddress,
              shipCity: order.shipCity,
              shipRegion: order.shipRegion,
              shipPostalCode: order.shipPostalCode,
              shipCountry: order.shipCountry,
              shipPhone: order.shipPhone,
              shipFax: order.shipFax,
              employeeId: order.employeeId,
              shipVia: order.shipVia,
              requiredDate: new Date(order.requiredDate),
              shippedDate: new Date(order.shippedDate)
            });
            this.orderProducts = order.details;
            this.netTotal = order.orderTotal;
            this.getSameCustomerOrders(order.customerId);
           /* var valuesA = this.products.reduce(function(a,c){a[c.productId] = c.productId; return a; }, {});
            var valuesB = this.orderProducts.reduce(function(a,c){a[c.productId] = c.productId; return a; }, {});
            this.currentOrderProducts = this.products.filter(function(c){ return !valuesB[c.productId]}).concat(this.orderProducts.filter(function(c){ return !valuesA[c.productId]}));*/
          } else {
            this.toastr.error('Something went wrong!', 'Error!');      
          }
      },(err) => {
        this.toastr.error('Something went wrong!', 'Error!');
      });
    }
    this.modalRef = this.modalService.show(template, {class: 'modal-xlg right-side-modal product-modal big', animated: true});
  }

  onChangeCustomer() {
    let customerId = this.orderForm.value.customerId;
    this.orderFromSameCustomer = [];
    if(customerId != "") {
      this.getSameCustomerOrders(customerId);
      this.customerClient.customerById(customerId)
        .subscribe((customer) => {
          if(customer != null) {
            this.orderForm.patchValue({
              shipName: customer.contactName,
              shipTitle: customer.contactTitle,
              shipAddress: customer.address,
              shipCity: customer.city,
              shipRegion: customer.region,
              shipPostalCode: customer.postalCode,
              shipCountry: customer.country,
              shipPhone: customer.phone,
              shipFax: customer.fax
            });
          } else {
            this.toastr.error('Something went wrong!', 'Error!');      
          }
      },(err) => {
        this.toastr.error('Something went wrong!', 'Error!');
      });
    }
  }
  

  editProduct(idx) {
    this.productEditMode = true;
    let productDetails:any = {};
    productDetails = JSON.parse(JSON.stringify(this.orderProducts[idx]));
    
    this.currentProduct = productDetails;
    this.currentProduct.index = idx;
    if(productDetails.discount && productDetails.discount != ''){
      productDetails.discount = (productDetails.discount*100).toFixed(2);
    } else {
      productDetails.discount = ''
    }

    //first remove data from orderProducts then add that product to product list
    /*this.orderProducts.splice(idx,1);
    var valuesA = this.products.reduce(function(a,c){a[c.productId] = c.productId; return a; }, {});
    var valuesB = this.orderProducts.reduce(function(a,c){a[c.productId] = c.productId; return a; }, {});
    this.currentOrderProducts = this.products.filter(function(c){ return !valuesB[c.productId]}).concat(this.orderProducts.filter(function(c){ return !valuesA[c.productId]}));
    this.calculateNetTotal();*/

    this.productForm.patchValue({
      productId:productDetails.productId,
      quantity: productDetails.quantity,
      discount: productDetails.discount,
    });
  }

  deleteProduct(idx) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete this product?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.orderProducts.splice(idx,1);
        this.calculateNetTotal();
        this.productForm.reset();
        this.existProduct = false;
        this.productEditMode = false;
        /*var valuesA = this.products.reduce(function(a,c){a[c.productId] = c.productId; return a; }, {});
        var valuesB = this.orderProducts.reduce(function(a,c){a[c.productId] = c.productId; return a; }, {});
        this.currentOrderProducts = this.products.filter(function(c){ return !valuesB[c.productId]}).concat(this.orderProducts.filter(function(c){ return !valuesA[c.productId]}));*/
        Swal.fire(
          'Deleted!',
          'Product has been deleted.',
          'success'
        )
      }
    })
  }

  onSubmitOrder() {
    this.isOrderFormSubmitted = true;
    if(this.orderForm.valid) {
      let orderData = this.orderForm.value;
      orderData.orderTotal = this.netTotal;
      orderData.details = this.orderProducts;

      orderData.employeeId = +orderData.employeeId;
      orderData.shipVia = +orderData.shipVia;
      //orderData.orderDate = moment().format('YYYY-MM-DD');
      orderData.orderDate = new Date();
      
      // add order
      if(this.orderEditMode) {
        // update order
        this.ordersClient.saveWholeOrder(orderData)
          .subscribe((res) => {
            if(res != null) {
              this.toastr.success('Order updated successfully!', 'Success!');
              this.modalRef.hide();
              this.clearModalData();
              this.searchFormSubmit();
            } else {
              this.toastr.error('Something went wrong!', 'Error!');      
            }
        },(err) => {
          this.toastr.error('Something went wrong!', 'Error!');
        });
      } else {
        // add order
        delete orderData["orderId"];
        this.ordersClient.saveWholeOrder(orderData)
          .subscribe((res) => {
            if(res != null) {
              this.toastr.success('Order created successfully!', 'Success!');
              this.modalRef.hide();
              this.clearModalData();
              this.searchFormSubmit();
            } else {
              this.toastr.error('Something went wrong!', 'Error!');      
            }
        },(err) => {
          this.toastr.error('Something went wrong!', 'Error!');
        });
      }
    }
  }

  clearModalData() {
    this.isOrderFormSubmitted = false;
    this.orderForm.reset();
    this.productForm.reset();
    this.existProduct = false;
    this.orderProducts = [];
    this.netTotal = 0;
    this.isOrderFormSubmitted = false;
    this.isProductFormSubmitted = false;
    this.orderFromSameCustomer = [];
  }

  calculateNetTotal() {
    this.netTotal = 0;
    this.orderProducts.map((p,i) => {
      this.netTotal = this.netTotal + p.lineTotal;
    });
  }

  onAddProduct() {
    this.isProductFormSubmitted = true;
    if(this.productForm.valid) {
      let productId = this.productForm.value.productId;
      //orderProducts
      this.client.getProductById(productId)
          .subscribe((product) => {
            if(product != null) {
              let orderData:any = {};
              if(this.orderEditMode) {
                orderData.orderId = this.orderForm.value.orderId;
              }
              orderData.productId = +this.productForm.value.productId;
              orderData.quantity = this.productForm.value.quantity;
              orderData.unitPrice = product.unitPrice;
              orderData.discount = this.productForm.value.discount
              if (orderData.discount && orderData.discount != '') {
                orderData.discount = +(+this.productForm.value.discount / 100).toFixed(2);
              } else {
                orderData.discount = 0;
              }

              orderData.lineTotal = +(product.unitPrice * this.productForm.value.quantity);
              orderData.lineTotal = +(orderData.lineTotal - (orderData.lineTotal*(this.productForm.value.discount/100))).toFixed(2);
              orderData.productName = product.productName;
              
              if(this.productEditMode) {
                this.orderProducts.splice(this.currentProduct.index,1,orderData);
                this.productEditMode = false;
                this.currentProduct = {};
              } else {
                this.orderProducts.push(orderData); 
              }
              
              //remove from main array
             /* let usedProductIndex:any = -1;
              let productId = this.productForm.value.productId;
              usedProductIndex=  this.products.findIndex(x => x.productId == productId);
              console.log('usedProductIndex',usedProductIndex);
              this.currentOrderProducts.splice(usedProductIndex,1);*/


              /*var valuesA = this.products.reduce(function(a,c){a[c.productId] = c.productId; return a; }, {});
              var valuesB = this.orderProducts.reduce(function(a,c){a[c.productId] = c.productId; return a; }, {});
              this.currentOrderProducts = this.products.filter(function(c){ return !valuesB[c.productId]}).concat(this.orderProducts.filter(function(c){ return !valuesA[c.productId]}));*/
              
              this.calculateNetTotal();
              this.productForm.reset();
              this.existProduct = false;
              this.isProductFormSubmitted = false;

              console.log('this.orderProducts.',this.orderProducts);
            } else {
              this.toastr.error('Something went wrong!', 'Error!');      
            }
        },(err) => {
          this.toastr.error('Something went wrong!', 'Error!');
        });
    }
  }


  currentOrderProductChange() {
    let selectedProduct = +this.productForm.value.productId;
    let existProductArray = this.orderProducts.filter(function(product, i){
      return (product.productId === selectedProduct)
    });
    if(existProductArray.length > 0){
      this.existProduct = true;
    } else {
      this.existProduct = false;
    }
  }

  /* new table*/
  // changePage() - Display records according to page.
  /*changePage(){
    this.pageWiseArray = [];
    for(let j=((this.perPageLimit * this.pageNumber) - this.perPageLimit); 
            j<(this.perPageLimit * this.pageNumber); 
            j++){
      if(j < this.orders.length)
        this.pageWiseArray.push(this.orders[j]);
    }
  }

  //changePageLimit()
  changePageLimit(){
    this.changePage();
  }

  // sortOrder() - Sort Orders according to column.
  sortOrder(columnName: string) {
    if (!this.sortingColumn || this.sortingColumn != columnName) {
      this.sortType = "ASC";
    }
    this.sortingColumn = columnName;
    if (!this.sortType || this.sortType === "DESC") {
      this.orders.sort((a, b) => (a[columnName] > b[columnName]) ? 1 : -1);
      this.sortType = "ASC";
    } else {
      this.orders.sort((a, b) => (a[columnName] > b[columnName]) ? -1 : 1);
      this.sortType = "DESC";
    }
    this.changePage();
  }

  // pageChanged() - Event is fired when page is changed.
  pageChanged(event) {
    console.log('event',event.page)
    this.pageNumber = event.page;
    this.changePage();
  }*/



  
  //changePageLimit()
  changePageLimit(){
    this.paginationService.changePageLimit(this.perPageLimit, this.orders)
  }
  // sortOrder() - Sort Orders according to column.
  sortOrder(columnName: string) {
    this.paginationService.sortOrder(columnName, this.orders)
  }
  // pageChanged() - Event is fired when page is changed.
  pageChanged(event) {
    this.paginationService.pageChanged(event.page, this.orders);
  }


  //exportToExcel => export Data to excel
  exportToExcel(){
    this.exportService.exportExcel(this.orders,
      this.dataTableHeaders,
      this.dataColumns,
      "Orders");
  }

  filterData(){
    if(this.search){
      this.orders = this.filterPipe.transform(this.allOrders, this.dataColumns, this.search);
    }else{
      this.orders = this.allOrders;
    }
    this.paginationService.changePage(this.orders);
    //this.changePage();
    this.sortOrder(this.sortingColumn);
  }

  /*formatDate(dateString: any){
    var date = new Date(dateString);
    return  ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + date.getFullYear();
  }*/
  /** */

  onSelect(data: TabDirective): void {
    if(data.id == "tab2") {
      
    }
  }

  getSameCustomerOrders(customerId) {
    // call api for orders from same customer
    this.ordersClient.getOrdersByCustID(customerId)
      .subscribe((orders) => {
        if(orders != null) {
          console.log('orders', orders);
          let allOrders: any = orders;
          allOrders.filter(x => {
            x.orderDate = this.dateService.formatDate(x.orderDate);
            x.requiredDate = this.dateService.formatDate(x.requiredDate);
            x.shippedDate = this.dateService.formatDate(x.shippedDate);
            x.orderTotal = (x.orderTotal == null) ? 0.00 : x.orderTotal.toFixed(2);
            x.orderTotal = "$ " + x.orderTotal;
          })
          this.orderFromSameCustomer = allOrders;
        } else {
          this.toastr.error('Something went wrong!', 'Error!');      
        }
    },(err) => {
      this.toastr.error('Something went wrong!', 'Error!');
    });
  }
}
