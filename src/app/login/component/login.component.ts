import {OnInit,Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';

import {alertService} from '../../services/alert.service';
import {authenticationService} from '../../services/authentication.service';

@Component({
    selector:'app-logincomponent',
    templateUrl:'../page/login.component.html',
    styleUrls:['../page/login.component.css']
})
export class logincomponent implements OnInit{
    loginForm:FormGroup;
    submitted=false;
    loading=false;
    returnUrl:string;
    constructor(
        private formBuilder: FormBuilder,
        private alertservice : alertService,
        private router:Router,
        private route:ActivatedRoute, 
        private authetication:authenticationService
    ){}
    ngOnInit(){
        this.loginForm=this.formBuilder.group({
            username:['',Validators.required],
            password :['',Validators.required]
        });

        this.authetication.logout();
        this.returnUrl=this.route.snapshot.queryParams['returnUrl'] || '/';

    }
    get f(){
        return this.loginForm.controls;
    }
    onSubmit(){
        this.submitted=true;
        if(this.loginForm.invalid){
            return;
        }
        this.loading=true;
        this.authetication.login(this.f.username.value,this.f.password.value)
        .pipe(first()).subscribe(
            data=>{
                this.alertservice.success('',true);
                this.router.navigate([this.returnUrl]);
            },
            error=>{
                this.alertservice.error(error);
                this.loading=false;
            }
        );
    }
}