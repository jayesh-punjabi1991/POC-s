import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header.component';
import { FooterComponent } from '../components/footer.component';
import { ValidateAdmin } from '../services/validateCredentials.service';

@Component({
  moduleId:module.id,
  selector: 'dashboard',
  templateUrl: `./dashboard.component.html`,
  styleUrls:['../stylesheets/dashboard.css'],
  providers:[ValidateAdmin]
})
export class DashboardComponent  {
  sponsors:any;
  number:number;
  total:number;
  i:any;
  temp:any;
  credentials:any;
  showTable:boolean;
  showMessage:boolean;
  constructor(public ValidateAdmin : ValidateAdmin){
    this.showTable=true;
    this.showMessage=false;
    this.sponsors=JSON.parse(sessionStorage.getItem("Sponsors"));
    this.number=this.sponsors.registeredUsers.length;
    if(this.number==0){
      this.showTable=false;
      this.showMessage=true;
    }
    this.total=this.number*60000;
    for(this.i=0;this.i<this.sponsors.registeredUsers.length;this.i++){
      this.temp=new Date(this.sponsors.registeredUsers[this.i].registrationDate);
      this.sponsors.registeredUsers[this.i].registrationDate=this.temp.getMonth() + 1 + '/' + this.temp.getDate() + '/' +  this.temp.getFullYear();
    }
    console.log(this.sponsors.registeredUsers);
  }
  refresh(){
      this.credentials= JSON.parse(sessionStorage.getItem("Credentials"));
      this.ValidateAdmin.validateAdmin(this.credentials).subscribe(returned=>{
      sessionStorage.setItem('Sponsors',JSON.stringify(returned));
      this.sponsors=JSON.parse(sessionStorage.getItem("Sponsors"));
      this.number=this.sponsors.registeredUsers.length;
      if(this.number==0){
        this.showTable=false;
        this.showMessage=true;
      }
      else{
        this.showTable=true;
        this.showMessage=false;
      }
      this.total=this.number*60000;
      for(this.i=0;this.i<this.sponsors.registeredUsers.length;this.i++){
        this.temp=new Date(this.sponsors.registeredUsers[this.i].registrationDate);
        this.sponsors.registeredUsers[this.i].registrationDate=this.temp.getMonth() + 1 + '/' + this.temp.getDate() + '/' +  this.temp.getFullYear();
      }
    });

  }
}
