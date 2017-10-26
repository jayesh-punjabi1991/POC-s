import { Component } from '@angular/core';
import {PassService} from '../services/passData.service';

@Component({
  moduleId:module.id,
  selector: 'invoice',
  templateUrl: `./invoice.component.html`,
  styleUrls:['../stylesheets/invoice.css','../stylesheets/printInvoice.css'],
  providers:[PassService]
})
export class InvoiceComponent {
  SponsorDetails:SponsorDetails;
  invoiceDateTemp:Date;
  invoiceDate:string;
  invoiceNumber:string;
  companyAddress:string;
  cityStateZip:string;
  companyName:string;
  name:string;
  constructor(public PassService:PassService){
    this.SponsorDetails=JSON.parse(this.PassService.getSponsorDetail());
    console.log(this.SponsorDetails);
    this.invoiceDateTemp=new Date(this.SponsorDetails.details.registrationDate);
    this.invoiceDate=this.invoiceDateTemp.getMonth() + 1 + '/' + this.invoiceDateTemp.getDate() + '/' +  this.invoiceDateTemp.getFullYear();
    this.invoiceNumber=this.SponsorDetails.details.registrationNumber;
    this.companyAddress=this.SponsorDetails.details.userDetails.address.companyAddress;
    this.cityStateZip=this.SponsorDetails.details.userDetails.address.cityStateZip;
    this.name=this.SponsorDetails.details.userDetails.name;
    this.companyName=this.SponsorDetails.details.userDetails.company;
  }
  Print(){
    window.print();
  }
}
interface SponsorDetails{
  details:details;
}
interface details{
  registrationDate:number;
  registrationNumber:string;
  userDetails:userDetails;
}
interface userDetails{
  name:string;
  email:string;
  title:string;
  company:string;
  phoneNumber:number;
  coxContact:string;
  address:address;
 }
interface address{
  companyAddress:string;
  cityStateZip:string;
}
