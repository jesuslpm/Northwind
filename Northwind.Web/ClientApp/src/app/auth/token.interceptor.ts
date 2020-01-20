import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse }   from '@angular/common/http';
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    @BlockUI() blockUI: NgBlockUI;
    source = timer(2000);
    apiList= [];
    constructor(
        private toastr: ToastrService
    ) {
        
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.apiList.push(request.url);
        // this will call after 2seconds and check if still api response is not fetched then show spinner
        this.source.subscribe((val) => {
           if(this.apiList.length > 0) {
            this.blockUI.start('Loading...');
           }
        });
        request = request.clone({
        setHeaders: {
            //Authorization: `Bearer testToken`
            }
        });
        return next.handle(request).pipe(
            tap(evt => {
                if (evt instanceof HttpResponse) {
                    // this will remove api from array once response fetched
                    this.apiList = this.apiList.filter(e => e !== evt.url);
                    let myInterval = setInterval(()=>{
                        if(this.apiList.length <= 0) {
                            this.blockUI.stop();
                            clearInterval(myInterval);
                        }
                    }, 100);
                    if(evt.body && evt.body.success){
                    }
                }
            }),
            catchError((err: any) => {
                this.blockUI.stop();
                if(err instanceof HttpErrorResponse) {
                    try {
                        this.toastr.error(err.statusText, 'Error!');
                    } catch(e) {
                        this.toastr.error('An error occurred', 'Error!');
                    }
                }
                return of(err);
            }));
    }
}