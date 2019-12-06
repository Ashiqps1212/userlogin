import {OnInit,Component} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { authenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
    selector:'home',
    templateUrl:'../page/home.component.html',
    styleUrls:['../page/home.component.css']
})
export class homecomponent implements OnInit{
    homepage:FormGroup
    constructor(private authentiactonservice:authenticationService
        ,private router:Router,
        private formbuilder:FormBuilder
        ){}
    ngOnInit(){
        this.homepage=this.formbuilder.group({});
        
    
    }
}