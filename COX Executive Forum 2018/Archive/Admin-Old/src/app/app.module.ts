import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { LoginComponent }  from './components/login.component';
import { DashboardComponent }  from './components/dashboard.component';
import { HeaderComponent }  from './components/header.component';
import { FooterComponent }  from './components/footer.component';
import { ValidateAdmin }  from './services/validateCredentials.service';

import { Routing }  from './app.routing';

@NgModule({
  imports:      [ BrowserModule,FormsModule,HttpModule,Routing ],
  declarations: [ AppComponent,LoginComponent,HeaderComponent,FooterComponent,DashboardComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ValidateAdmin]
})
export class AppModule { }
