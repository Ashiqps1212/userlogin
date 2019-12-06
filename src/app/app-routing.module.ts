import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent} from './app.component';
import {logincomponent} from './login/component/login.component';
import {registercomponent} from './Register/component/register.component';
import { authentication } from './Authentication/component/authentication';
import { homecomponent } from './Home/component/home.component';
import { datainserting } from './DataManupulate/datainsert/component/datainsert';


const routes: Routes = [
 {path:'login',component: logincomponent},
  {path:'', component: homecomponent , canActivate: [authentication]},
  {path:'register',component:registercomponent},
  {path:'add-data',component:datainserting},
  { path: '**', redirectTo: '' }

];

//  @NgModule({
  
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
export const routing = RouterModule.forRoot(routes);
