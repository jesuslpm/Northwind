import { Component, OnInit, OnDestroy,AfterViewInit,ViewChild, TemplateRef  } from '@angular/core';
import { CatalogClient, Product, Category, Supplier } from '../clients';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy,AfterViewInit {

  products: Product[] = [];
  categories: Category[] = [];
  suppliers: Supplier[] = [];
  dtOptions: any = {};
  dtTrigger: any = new Subject();
  @ViewChild(DataTableDirective,{static: false}) datatableElement: DataTableDirective;
  searchForm: FormGroup;
  productForm: FormGroup;
  modalRef: BsModalRef;
  currentProduct: Product;

  constructor(
    private client: CatalogClient,
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
            columns: [ 0, 1,2,3,4,5]
          },
          filename: function(){
            var d = new Date();
            var n = d.getTime();
            return 'Products-' + moment(d).format('DD-MM-YYYY-HH:mm:ss');
          }
        }
      ],
    };

    this.getProducts();
    this.getCategories();
    this.getSuppliers();

    this.searchForm = this.fb.group({
          supplier: [''],
          category: ['']
    });
    
    this.productForm = this.fb.group({
      suplierName: [''],
      categoryId: [''],
      quantityPerUnit: [''],
      unitPrice: [''],
      unitsInStock: [''],
      discontinued: [''],
    });
  }

  ngAfterViewInit(): void {
    const that = this;
    $.fn['dataTable'].ext.search.push((settings, data, dataIndex) => {
      const supplierName = (data[2]);
      const categoryName = (data[3]);
      const formData = that.searchForm.value;

      if((formData.supplier === '' && formData.category == '')) {
        return true;
      } else if(((formData.supplier != '') && (formData.supplier == supplierName)) && (formData.category == '')) {
        return true;
      } else if(((formData.category != '') && (formData.category == categoryName)) && (formData.supplier == '')) {
        return true;
      } else if (((formData.supplier !='') && (formData.supplier == supplierName)) && ((formData.category !='') && (formData.category == categoryName))) {
        return true;
      } else {
        return false;
      }
    });
  }

  getProducts() {
    this.client.getProducts()
          .subscribe((products) => {
            if(products != null) {
              this.products = products;
              this.dtTrigger.next();
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

  rerender(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  filterData(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

  openProductModal(template: TemplateRef<any>, productId) {
    this.client.getProductById(productId)
        .subscribe((product) => {
          if(product != null) {
            this.currentProduct = product;
            this.productForm.patchValue({
              suplierName: product.suplierName,
              categoryId: product.categoryName,
              quantityPerUnit: product.quantityPerUnit,
              unitPrice: product.unitPrice,
              unitsInStock: product.unitsInStock,
              discontinued: (product.discontinued == true)?'Yes':'No'
            });
            this.modalRef = this.modalService.show(template, {class: 'modal-lg right-side-modal product-modal'});
          } else {
            this.toastr.error('Something went wrong!', 'Error!');      
          }
      },(err) => {
        this.toastr.error('Something went wrong!', 'Error!');
      });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    $.fn['dataTable'].ext.search.pop();
  }

}
