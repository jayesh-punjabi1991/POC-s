import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { HomeComponent }  from './components/home.component';
import { AboutComponent }  from './components/about.component';
import { SponsorDetailComponent }  from './components/sponsorDetailForm.component';
import { AcknowledgementComponent }  from './components/Acknowledgement.component';
import { PrintComponent }  from './components/print.component';
import { AuctionComponent }  from './components/auction.component';
import { HeaderComponent }  from './components/header.component';
import { FooterComponent }  from './components/footer.component';
import{ AuctionDonationComponent } from './components/auctionDonation.component';
import{ AuctionDonationFormComponent } from './components/auctionDonationForm.component';
import{ InvoiceComponent } from './components/invoice.component';

import { Routing }  from './app.routing';

@NgModule({
  imports:      [ BrowserModule,FormsModule,HttpModule,Routing ],
  declarations: [ AppComponent,HomeComponent,HeaderComponent,AboutComponent,FooterComponent,SponsorDetailComponent,AcknowledgementComponent,PrintComponent,AuctionComponent,AuctionDonationComponent,AuctionDonationFormComponent,InvoiceComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
