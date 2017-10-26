import {Injectable} from "@angular/core";

@Injectable()
export class PassService{
  sponsorDetails :any;
  setSponsorDetail(res:any){
   this.sponsorDetails=res;
   sessionStorage.setItem('Details',JSON.stringify(this.sponsorDetails));
  }
  getSponsorDetail(){
    this.sponsorDetails=sessionStorage.getItem('Details');
    return this.sponsorDetails;
  }
}
