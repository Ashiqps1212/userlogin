import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {routing} from './app-routing.module';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import {logincomponent} from './login/component/login.component';
import {registercomponent} from './Register/component/register.component';
import {homecomponent} from './Home/component/home.component';
import {authentication} from './Authentication/component/authentication';
import {alertService} from './services/alert.service';
import {alertComponent} from './alerts/component/alert.comopnent';
import {authenticationService} from './services/authentication.service';
import {errorBackend} from './backend/error.backend';
import {jwtBackend} from './backend/jwt.backend';
import {storageBackendProvider} from './backend/storage.backend';
import {userService} from './services/user.service';
import { datainserting } from './DataManupulate/datainsert/component/datainsert';

@NgModule({
  declarations: [
    AppComponent,
    logincomponent,
    registercomponent,
    homecomponent,
    alertComponent,
    datainserting
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [authentication,alertService,authenticationService
  ,{provide:HTTP_INTERCEPTORS,useClass:jwtBackend,multi:true},
  {provide:HTTP_INTERCEPTORS, useClass:errorBackend,multi:true},
  storageBackendProvider,userService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
