import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, JsonpInterceptor } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()

export class backendSaving implements HttpInterceptor{
    constructor(){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let users:any[] = JSON.parse(localStorage.getItem('users')) || [];
        let data: any[] = JSON.parse(localStorage.getItem('data')) || [];

        return of(null).pipe(mergeMap(()=>{
            if(req.url.endsWith(`/user/authentication`) && req.method==='POST'){
                let filteredUser = users.filter(user=>{
                    return user.email === req.body.username && user.password=== req.body.password;
                });
                if(filteredUser.length){
                    let user = filteredUser[0];
                    let body ={
                        id:user.id,
                        name:user.name,
                        email:user.email,
                        token:'fake-jwt-token'
                    };
                    localStorage.setItem('id',JSON.stringify(user.id));
                    return of(new HttpResponse({
                        status:200,body:body
                    }));
                }else{
                    return throwError({error: {message:'Username or password error'}
                    });
                }
            }
            if(req.url.endsWith(`/user`) && req.method==='GET'){
                if (req.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let id:number = JSON.parse(localStorage.getItem('id'));
                    let matchedUsers = users.filter(user => { return user.id === id; });
                    let user = matchedUsers.length ? matchedUsers[0] : null;

                    return of(new HttpResponse({ status: 200, body: user.id }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }

            if(req.url.endsWith(`/users/register`) && req.method==='POST'){
                let newUser = req.body;
                let duplicate = users.filter(user=>{
                    return user.email=== newUser.email;
                }).length;
                if(duplicate){
                    return throwError({error:{message:'email"'+newUser.email+'"is already exist'}});
                }
                newUser.id=users.length+1;
                users.push(newUser);
                localStorage.setItem('users',JSON.stringify(users));
                return of(new HttpResponse({status:200}));
            }
            if(req.url.endsWith(`/user/data`)&& req.method==='POST'){
               let userData=req.body;
               
               userData.id=1;
               console.log(userData);
              //JSON.parse(localStorage.getItem('id'));
               data.push(userData);
               console.log(userData);
                localStorage.setItem('data',JSON.stringify(data));
                return of(new HttpResponse({status:200}));
               
           
            }


            return next.handle(req);
        }))
        .pipe(materialize()).pipe(delay(500)).pipe(dematerialize());
    }
    
}
export let storageBackendProvider ={
    provide : HTTP_INTERCEPTORS,
    useClass : backendSaving,
    multi:true
};