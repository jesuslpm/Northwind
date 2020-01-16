import { Component, OnInit, OnDestroy,AfterViewInit,ViewChild, TemplateRef  } from '@angular/core';
import { CatalogClient, Product, Category, Supplier } from '../clients';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { DateService } from './../services/date.service';
import { PaginationService } from './../services/pagination.service';
import { ExportService } from '../services/export.service';
import { FilterPipe } from '../pipes/filter.pipe';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy,AfterViewInit {

  products: Product[] = [];
  allProducts: Product[] = [];
  categories: Category[] = [];
  suppliers: Supplier[] = [];
  searchForm: FormGroup;
  productForm: FormGroup;
  modalRef: BsModalRef;
  currentProduct: Product;

  search:string = "";
  perPageLimit = 10;
  sortingColumn:string = "";
  pageWiseArray = [];
  dataTableHeaders=['Product', 'Product Name', 'Supplier', 'Category',
  'Unit Price $', 'Discontinued'];
  dataColumns=['productId', 'productName', 'suplierName', 'categoryName',
  'unitPrice', 'discontinued'];;

  constructor(
    private client: CatalogClient,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private paginationService:PaginationService,
    private dateService:DateService,
    private exportService:ExportService,
    public filterPipe:FilterPipe,
  ) { }

  ngOnInit() {
    
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

    this.paginationService.currentMessage.subscribe((newData) =>{
      this.pageWiseArray = newData
    });
  }

  ngAfterViewInit(): void {
    const that = this;
    /*$.fn['dataTable'].ext.search.push((settings, data, dataIndex) => {
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
    });*/
  }

  getProducts() {
    this.client.getProducts()
          .subscribe((products) => {
            if(products != null) {
              this.products = products;
              let allProducts: any = products;
              allProducts.filter(x => {
                x.unitPrice = (x.unitPrice == null) ? 0.00 : x.unitPrice.toFixed(2);
                x.unitPrice = "$ " + x.unitPrice;
              })
              this.products = allProducts;
              this.allProducts= this.products;
              this.paginationService.changePage(this.products);
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

  searchFilterData(): void {
    // this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
    //   dtInstance.draw();
    // });
    const formData = this.searchForm.value;
    

    if((formData.supplier === '' && formData.category == '')) {
      this.products = this.allProducts;
    } else if(((formData.supplier != '')) && (formData.category == '')) {
      this.products = this.filterPipe.transform(this.allProducts, ['suplierName'], formData.supplier);
    } else if(((formData.category != '')) && (formData.supplier == '')) {
      this.products = this.filterPipe.transform(this.allProducts, ['categoryName'], formData.category);
    } else if (((formData.supplier !='')) && ((formData.category !=''))) {
      let filteredSuppliers = this.filterPipe.transform(this.allProducts, ['suplierName'], formData.supplier);
      
      this.products = this.filterPipe.transform(filteredSuppliers, ['categoryName'], formData.category);
      console.log('products',this.products);
      if(this.products.length == 0){
        this.paginationService.changePage("");
      } else {
        this.paginationService.changePage(this.products);
      }
      
    } else {
      this.products = this.allProducts;
    }

    
    this.paginationService.changePage(this.products);
    this.sortOrder(this.sortingColumn);
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



  //changePageLimit()
  changePageLimit(){
    this.paginationService.changePageLimit(this.perPageLimit, this.products)
  }
  // sortOrder() - Sort Orders according to column.
  sortOrder(columnName: string) {
    this.paginationService.sortOrder(columnName, this.products)
  }
  // pageChanged() - Event is fired when page is changed.
  pageChanged(event) {
    this.paginationService.pageChanged(event.page, this.products);
  }


  //exportToExcel => export Data to excel
  exportToExcel(){
    this.exportService.exportExcel(this.products,
      this.dataTableHeaders,
      this.dataColumns,
      "Orders");
  }

  filterData() {
    if(this.search){
      this.products = this.filterPipe.transform(this.allProducts, this.dataColumns, this.search);
    }else{
      this.products = this.allProducts;
    }
    this.paginationService.changePage(this.products);
    this.sortOrder(this.sortingColumn);
  }

  ngOnDestroy(): void {
    this.paginationService.changePage([]);
  }

}
