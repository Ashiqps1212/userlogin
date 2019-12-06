import {OnInit,Component} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { userService } from 'src/app/services/user.service';
import { alertService } from 'src/app/services/alert.service';
import { RegisterData } from 'src/app/datavaribles/register';
import { first } from 'rxjs/operators';

@Component({
    selector:'home',
    templateUrl:'../page/data.insert.html',
    styleUrls:['../page/data.insert.css']
})
export class datainserting implements OnInit{
    datainsert:FormGroup;
    loading=false;
    user:number;
    currentUser:RegisterData;
    users: RegisterData[]=[];
    userid:number;
    submitted=false;

    constructor(private formbuilder:FormBuilder,
        private userservice:userService,
        private router:Router,
        private alertservice:alertService){
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }
    ngOnInit(){
        this.datainsert=this.formbuilder.group({
            phone:['', Validators.required],
            address:['', Validators.required],
            dob:['', Validators.required]
        });
        this.getUser();
        let data:any[]=JSON.parse(localStorage.getItem('users'));
        console.log(data);
        console.log(data[0]);
        console.log(data[1]);
        console.log(data['id']);
    }
    get f() { return this.datainsert.controls; }
    onSubmit(){
     
        this.submitted=true;
        if(this.datainsert.invalid)
        {
           return;
        }
        this.loading=true;
       this.userservice.savedata(this.datainsert.value).pipe(first())
       .subscribe(data=>{
       
           this.alertservice.success('Successful',true);
           this.router.navigate(['']);
       },error=>{
           this.alertservice.error(error);
          this.loading=false;
           
       }
       
       )
    }

    getUser(){
        this.userservice.getUserId().pipe(first()).subscribe(users => { 
            this.userid=users;
        });
    }
}