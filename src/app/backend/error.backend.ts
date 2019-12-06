import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {authenticationService} from '../services/authentication.service';



@Injectable()
export class errorBackend implements HttpInterceptor{
    constructor(private authentication:authenticationService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(err =>{
           if(err.status===401) {
                this.authentication.logout();
                location.reload(true);
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
         }))
    }

}