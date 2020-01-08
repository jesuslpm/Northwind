import { Component, OnInit, OnDestroy,AfterViewInit,ViewChild, TemplateRef  } from '@angular/core';
import { CatalogClient, Product, Category, Supplier } from '../clients';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
  currentProduct: Product;

  constructor(
    private client: CatalogClient,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
      this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 10,
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

  openModal() {
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    $.fn['dataTable'].ext.search.pop();
  }

}
