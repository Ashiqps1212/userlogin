import {Component,OnInit,OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

import {alertService} from '../../services/alert.service';

@Component({
    selector:'alert',
    templateUrl:'../page/alert.component.html',
    styleUrls:[]
})

export class alertComponent implements OnInit, OnDestroy{
    private subscription : Subscription;
    message:any;

    constructor(private alerservice: alertService){}
    ngOnDestroy(){
        this.subscription.unsubscribe();
    }
    ngOnInit() {
        
        this.subscription=this.alerservice.getMessage().subscribe(message =>{this.message=message});
    }

}
