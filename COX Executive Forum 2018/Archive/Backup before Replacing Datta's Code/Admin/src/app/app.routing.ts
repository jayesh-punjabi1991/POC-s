import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent }  from './app.component';
import { LoginComponent }  from './components/login.component';
import { DashboardComponent }  from './components/dashboard.component';

const appRoute : Routes = [
  {
    path:'forumadmin',
    component:AppComponent,
    children:[
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'dashboard',
        component:DashboardComponent
      }
    ]
  },
  { path: '**', redirectTo: 'forumadmin/login' }
]

export const Routing : ModuleWithProviders = RouterModule.forRoot(appRoute,{useHash: true});
