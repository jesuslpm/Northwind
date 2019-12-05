import { Component, OnInit } from '@angular/core';
import { CatalogClient, Product, Category } from '../clients';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

    products: Product[] = [];

    categories: Category[] = []

    constructor(private client: CatalogClient) { }

    ngOnInit() {
        this.client.getProducts()
            .subscribe(products => {
                this.products = products;
            });

        this.client.getCategories()
            .subscribe(categories => {
                this.categories = categories;
            });
    }
}
