﻿/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.2.0.0 (NJsonSchema v10.1.2.0 (Newtonsoft.Json v12.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable()
export class CatalogClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "http://192.168.1.173";
    }

    /**
     * Returns all products in the catalog
     * @return a list of products
     */
    getProducts(): Observable<Product[]> {
        let url_ = this.baseUrl + "/catalog/products";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",			
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetProducts(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetProducts(<any>response_);
                } catch (e) {
                    return <Observable<Product[]>><any>_observableThrow(e);
                }
            } else
                return <Observable<Product[]>><any>_observableThrow(response_);
        }));
    }

    protected processGetProducts(response: HttpResponseBase): Observable<Product[]> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <Product[]>JSON.parse(_responseText, this.jsonParseReviver);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<Product[]>(<any>null);
    }

    /**
     * Product by Id
     * @return Product By Id
     */
    getProductById(productId: number): Observable<Product> {
        let url_ = this.baseUrl + "/catalog/products/{productId}";
        if (productId === undefined || productId === null)
            throw new Error("The parameter 'productId' must be defined.");
        url_ = url_.replace("{productId}", encodeURIComponent("" + productId)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",			
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetProductById(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetProductById(<any>response_);
                } catch (e) {
                    return <Observable<Product>><any>_observableThrow(e);
                }
            } else
                return <Observable<Product>><any>_observableThrow(response_);
        }));
    }

    protected processGetProductById(response: HttpResponseBase): Observable<Product> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <Product>JSON.parse(_responseText, this.jsonParseReviver);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<Product>(<any>null);
    }

    /**
     * Returns all categories
     * @return a list of categories
     */
    getCategories(): Observable<Category[]> {
        let url_ = this.baseUrl + "/catalog/categories";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",			
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetCategories(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetCategories(<any>response_);
                } catch (e) {
                    return <Observable<Category[]>><any>_observableThrow(e);
                }
            } else
                return <Observable<Category[]>><any>_observableThrow(response_);
        }));
    }

    protected processGetCategories(response: HttpResponseBase): Observable<Category[]> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <Category[]>JSON.parse(_responseText, this.jsonParseReviver);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<Category[]>(<any>null);
    }

    /**
     * Returns all suppliers
     * @return a list of suppliers
     */
    getSuppliers(): Observable<Supplier[]> {
        let url_ = this.baseUrl + "/catalog/suppliers";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",			
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetSuppliers(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetSuppliers(<any>response_);
                } catch (e) {
                    return <Observable<Supplier[]>><any>_observableThrow(e);
                }
            } else
                return <Observable<Supplier[]>><any>_observableThrow(response_);
        }));
    }

    protected processGetSuppliers(response: HttpResponseBase): Observable<Supplier[]> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <Supplier[]>JSON.parse(_responseText, this.jsonParseReviver);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<Supplier[]>(<any>null);
    }
}

@Injectable()
export class CustomersClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "http://192.168.1.173";
    }

    /**
     * Returns Customers List
     * @return Customer List
     */
    getAllCustomers(): Observable<Customer[]> {
        let url_ = this.baseUrl + "/customers/getallcustomers";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",			
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetAllCustomers(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllCustomers(<any>response_);
                } catch (e) {
                    return <Observable<Customer[]>><any>_observableThrow(e);
                }
            } else
                return <Observable<Customer[]>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllCustomers(response: HttpResponseBase): Observable<Customer[]> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <Customer[]>JSON.parse(_responseText, this.jsonParseReviver);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<Customer[]>(<any>null);
    }

    /**
     * Return Customer By Id
     * @return Customer Detail
     */
    customerById(customerId: string | null): Observable<Customer> {
        let url_ = this.baseUrl + "/customers?";
        if (customerId === undefined)
            throw new Error("The parameter 'customerId' must be defined.");
        else
            url_ += "customerId=" + encodeURIComponent("" + customerId) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",			
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processCustomerById(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCustomerById(<any>response_);
                } catch (e) {
                    return <Observable<Customer>><any>_observableThrow(e);
                }
            } else
                return <Observable<Customer>><any>_observableThrow(response_);
        }));
    }

    protected processCustomerById(response: HttpResponseBase): Observable<Customer> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <Customer>JSON.parse(_responseText, this.jsonParseReviver);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<Customer>(<any>null);
    }
}

@Injectable()
export class EmployeesClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "http://192.168.1.173";
    }

    /**
     * Returns Employee List
     * @return Employee List
     */
    getAllEmployees(): Observable<EmployeeMinimal[]> {
        let url_ = this.baseUrl + "/employees/getallemployees";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",			
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetAllEmployees(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllEmployees(<any>response_);
                } catch (e) {
                    return <Observable<EmployeeMinimal[]>><any>_observableThrow(e);
                }
            } else
                return <Observable<EmployeeMinimal[]>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllEmployees(response: HttpResponseBase): Observable<EmployeeMinimal[]> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <EmployeeMinimal[]>JSON.parse(_responseText, this.jsonParseReviver);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<EmployeeMinimal[]>(<any>null);
    }
}

@Injectable()
export class OrdersClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "http://192.168.1.173";
    }

    /**
     * Returns an order including its order details
     * @return an order
     */
    getWholeOrder(orderId: number): Observable<Order> {
        let url_ = this.baseUrl + "/orders?";
        if (orderId === undefined || orderId === null)
            throw new Error("The parameter 'orderId' must be defined and cannot be null.");
        else
            url_ += "orderId=" + encodeURIComponent("" + orderId) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",			
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetWholeOrder(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetWholeOrder(<any>response_);
                } catch (e) {
                    return <Observable<Order>><any>_observableThrow(e);
                }
            } else
                return <Observable<Order>><any>_observableThrow(response_);
        }));
    }

    protected processGetWholeOrder(response: HttpResponseBase): Observable<Order> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <Order>JSON.parse(_responseText, this.jsonParseReviver);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<Order>(<any>null);
    }

    /**
     * Saves an order including its order details
     * @return The order
     */
    saveWholeOrder(order: Order): Observable<Order> {
        let url_ = this.baseUrl + "/orders";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(order);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",			
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processSaveWholeOrder(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processSaveWholeOrder(<any>response_);
                } catch (e) {
                    return <Observable<Order>><any>_observableThrow(e);
                }
            } else
                return <Observable<Order>><any>_observableThrow(response_);
        }));
    }

    protected processSaveWholeOrder(response: HttpResponseBase): Observable<Order> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <Order>JSON.parse(_responseText, this.jsonParseReviver);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<Order>(<any>null);
    }

    /**
     * Returns an order including its order details
     * @return an order
     */
    getOrdersByCustID(customerId: string | null): Observable<Order[]> {
        let url_ = this.baseUrl + "/orders/getorderByCustId?";
        if (customerId === undefined)
            throw new Error("The parameter 'customerId' must be defined.");
        else
            url_ += "CustomerId=" + encodeURIComponent("" + customerId) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",			
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetOrdersByCustID(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetOrdersByCustID(<any>response_);
                } catch (e) {
                    return <Observable<Order[]>><any>_observableThrow(e);
                }
            } else
                return <Observable<Order[]>><any>_observableThrow(response_);
        }));
    }

    protected processGetOrdersByCustID(response: HttpResponseBase): Observable<Order[]> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <Order[]>JSON.parse(_responseText, this.jsonParseReviver);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<Order[]>(<any>null);
    }

    /**
     * Gets the order headers that meet the search criteria
     * @return The order
     */
    search(searchCriteria: OrderCriteria): Observable<Order[]> {
        let url_ = this.baseUrl + "/orders/search";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(searchCriteria);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",			
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processSearch(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processSearch(<any>response_);
                } catch (e) {
                    return <Observable<Order[]>><any>_observableThrow(e);
                }
            } else
                return <Observable<Order[]>><any>_observableThrow(response_);
        }));
    }

    protected processSearch(response: HttpResponseBase): Observable<Order[]> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <Order[]>JSON.parse(_responseText, this.jsonParseReviver);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<Order[]>(<any>null);
    }
}

@Injectable()
export class ShippersClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "http://192.168.1.173";
    }

    /**
     * Returns Customers List
     * @return Customer List
     */
    getAllShippers(): Observable<Shipper[]> {
        let url_ = this.baseUrl + "/shippers/getallshippers";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",			
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetAllShippers(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllShippers(<any>response_);
                } catch (e) {
                    return <Observable<Shipper[]>><any>_observableThrow(e);
                }
            } else
                return <Observable<Shipper[]>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllShippers(response: HttpResponseBase): Observable<Shipper[]> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <Shipper[]>JSON.parse(_responseText, this.jsonParseReviver);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<Shipper[]>(<any>null);
    }
}

@Injectable()
export class WeatherForecastClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "http://192.168.1.173";
    }

    get(): Observable<WeatherForecast[]> {
        let url_ = this.baseUrl + "/WeatherForecast";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",			
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGet(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGet(<any>response_);
                } catch (e) {
                    return <Observable<WeatherForecast[]>><any>_observableThrow(e);
                }
            } else
                return <Observable<WeatherForecast[]>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<WeatherForecast[]> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <WeatherForecast[]>JSON.parse(_responseText, this.jsonParseReviver);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<WeatherForecast[]>(<any>null);
    }
}

export interface Product {
    productId: number;
    productName?: string | undefined;
    supplierId?: number | undefined;
    categoryId?: number | undefined;
    quantityPerUnit?: string | undefined;
    unitPrice?: number | undefined;
    unitsInStock?: number | undefined;
    unitsOnOrder?: number | undefined;
    reorderLevel?: number | undefined;
    discontinued: boolean;
    totalSold?: number | undefined;
    usaSold?: number | undefined;
    otherCountrySold?: number | undefined;
    categoryName?: string | undefined;
    suplierName?: string | undefined;
}

export interface Category {
    categoryId: number;
    categoryName?: string | undefined;
    description?: string | undefined;
    picture?: string | undefined;
}

export interface Supplier {
    supplierId: number;
    companyName?: string | undefined;
    contactName?: string | undefined;
    contactTitle?: string | undefined;
    address?: string | undefined;
    city?: string | undefined;
    region?: string | undefined;
    postalCode?: string | undefined;
    country?: string | undefined;
    phone?: string | undefined;
    fax?: string | undefined;
    homePage?: string | undefined;
}

export interface Customer {
    customerId?: string | undefined;
    companyName?: string | undefined;
    contactName?: string | undefined;
    contactTitle?: string | undefined;
    address?: string | undefined;
    city?: string | undefined;
    region?: string | undefined;
    postalCode?: string | undefined;
    country?: string | undefined;
    phone?: string | undefined;
    fax?: string | undefined;
}

export interface EmployeeMinimal {
    employeeId: number;
    employeeFullName?: string | undefined;
}

export interface Order {
    orderId: number;
    customerId?: string | undefined;
    employeeId?: number | undefined;
    orderDate?: Date | undefined;
    requiredDate?: Date | undefined;
    shippedDate?: Date | undefined;
    shipVia?: number | undefined;
    freight?: number | undefined;
    shipName?: string | undefined;
    shipAddress?: string | undefined;
    shipCity?: string | undefined;
    shipRegion?: string | undefined;
    shipPostalCode?: string | undefined;
    shipCountry?: string | undefined;
    customerCompanyName?: string | undefined;
    employeeFirstName?: string | undefined;
    employeeLastName?: string | undefined;
    shipperCompanyName?: string | undefined;
    orderTotal?: number | undefined;
    shipTitle?: string | undefined;
    shipPhone?: string | undefined;
    shipFax?: string | undefined;
    shipper?: string | undefined;
    customerName?: string | undefined;
    details?: OrderDetail[] | undefined;
    employeeFullName?: string | undefined;
}

export interface OrderDetail {
    orderId: number;
    productId: number;
    unitPrice: number;
    quantity: number;
    discount: number;
    orderDetailId: number;
    productName?: string | undefined;
    lineTotal?: number | undefined;
}

export interface OrderCriteria {
    customerIds?: string[] | undefined;
    orderId?: number | undefined;
    orderDateFrom?: Date | undefined;
    orderDateTo?: Date | undefined;
    employeeIds?: number[] | undefined;
    shipperIds?: number[] | undefined;
    productIds?: number[] | undefined;
    orderAmountFrom?: number | undefined;
    orderAmountTo?: number | undefined;
    requiredDateFrom?: Date | undefined;
    requiredDateTo?: Date | undefined;
    shippedDateFrom?: Date | undefined;
    shippedDateTo?: Date | undefined;
}

export interface Shipper {
    shipperId: number;
    companyName?: string | undefined;
    phone?: string | undefined;
}

export interface WeatherForecast {
    date: Date;
    temperatureC: number;
    temperatureF: number;
    summary?: string | undefined;
}

export class SwaggerException extends Error {
    message: string;
    status: number; 
    response: string; 
    headers: { [key: string]: any; };
    result: any; 

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isSwaggerException = true;

    static isSwaggerException(obj: any): obj is SwaggerException {
        return obj.isSwaggerException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new SwaggerException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader(); 
            reader.onload = event => { 
                observer.next((<any>event.target).result);
                observer.complete();
            };
            reader.readAsText(blob); 
        }
    });
}