import {OnInit,Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { alertService } from 'src/app/services/alert.service';
import { userService } from 'src/app/services/user.service';
import { first } from 'rxjs/operators';

@Component({
    selector:'app-registercomponent',
    templateUrl:'../page/register.component.html',
    styleUrls:['../page/register.component.css']
})
export class registercomponent implements OnInit{

    registerForm:FormGroup;
    loading=false;
    submitted=false;

    constructor(
        private alertservice:alertService,
        private router:Router,
        private formbuilder:FormBuilder,
        private userservice:userService
        ){}
    ngOnInit(){
        this.registerForm = this.formbuilder.group({
            name:['', Validators.required],
            email:['',  [Validators.required]],
            password:['',[Validators.required,Validators.minLength(8)]]
        });

    }
    get f(){ return this.registerForm.controls;}

    OnSubmit(){

        this.submitted=true;
        if(this.registerForm.invalid)
        {
           return;
        }
        this.loading=true;
       this.userservice.register(this.registerForm.value).pipe(first())
       .subscribe(data=>{
        
           this.alertservice.success('Successful',true);
           this.router.navigate(['/login']);
       },error=>{
           this.alertservice.error(error);
          
           this.loading=false;
           
       }
       
       )
    }
}