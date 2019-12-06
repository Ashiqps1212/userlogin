import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class alertService {
    private subject = new Subject<any>();
    private keepAfterChange = false;

    constructor(private router :Router){
        router.events.subscribe(event =>{if (event instanceof NavigationStart){
            if(this.keepAfterChange){
                this.keepAfterChange=false;
            }else{
                this.subject.next();
            }
        }});
    }

    success(message: string, keepAfterChange=false){
        this.keepAfterChange=keepAfterChange;
        this.subject.next({type:'success',text:message});
    }
    error(message: string, keepAfterChange=false){
        this.keepAfterChange=keepAfterChange;
        this.subject.next({type:'error',text:message});
    }
    getMessage():Observable<any>{
        return this.subject.asObservable();
    }
   
}