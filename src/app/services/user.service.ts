import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


import {RegisterData} from '../datavaribles/register';
import { Data } from '@angular/router';

@Injectable()
export class userService {
    constructor(private http:HttpClient){}

    register(user:RegisterData){
        return this.http.post(`/users/register`,user);

    }
    getUserId(){
            return this.http.get<number>(`/user`);  

    }
    savedata(data:Data){
        return this.http.post(`/user/data`,data);

    }


}