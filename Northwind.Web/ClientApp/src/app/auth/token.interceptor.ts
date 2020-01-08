import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse }   from '@angular/common/http';
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    @BlockUI() blockUI: NgBlockUI;
    constructor(
        private toastr: ToastrService
    ) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.blockUI.start('Loading...');
        
        request = request.clone({
        setHeaders: {
            //Authorization: `Bearer testToken`
            }
        });
        //return next.handle(request);

        return next.handle(request).pipe(
            tap(evt => {
                //this.blockUI.stop();
                if (evt instanceof HttpResponse) {
                    this.blockUI.stop();
                    if(evt.body && evt.body.success){
                        //this.blockUI.stop();
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
                    //log error 
                }
                return of(err);
            }));
    }
}