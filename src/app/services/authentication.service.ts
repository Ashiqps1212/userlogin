import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class authenticationService {
    constructor(private http:HttpClient){}

    logout(){
        localStorage.removeItem('currentUser');
        localStorage.removeItem('id');
        localStorage.removeItem('data');

    }

    login(username:string,password:string){
        return this.http.post<any>(`/user/authentication`,{username:username,password:password})
        .pipe(map(user=>{
            if(user && user.token){
                localStorage.setItem('currentUser',JSON.stringify(user));
            }
            return user;
        }));
    }


} 