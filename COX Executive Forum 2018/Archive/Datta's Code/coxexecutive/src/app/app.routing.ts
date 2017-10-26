import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent }  from './app.component';
import { HomeComponent }  from './components/home.component';
import { AboutComponent }  from './components/about.component';
import { SponsorDetailComponent }  from './components/sponsorDetailForm.component';
import { AcknowledgementComponent }  from './components/Acknowledgement.component';
import { AuctionDonationComponent }  from './components/auctionDonation.component';
import { InvoiceComponent }  from './components/invoice.component';

const appRoute : Routes = [
  {
    path:'forum',
    component:AppComponent,
    children:[
      {
        path:'home',
        component:HomeComponent
      },
      {
        path:'about',
        component:AboutComponent
      },
      {
        path:'sponsorDetailForm',
        component:SponsorDetailComponent
      },
      {
        path:'acknowledgement',
        component:AcknowledgementComponent
      },
      {
        path:'auctionDonationInformation',
        component:AuctionDonationComponent
      },
      {
        path:'invoice',
        component:InvoiceComponent
      }
    ]
  },
  { path: '**', redirectTo: 'forum/about' }
]

export const Routing : ModuleWithProviders = RouterModule.forRoot(appRoute,{useHash: true});
