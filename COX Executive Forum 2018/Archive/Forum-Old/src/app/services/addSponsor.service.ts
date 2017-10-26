import {Injectable} from "@angular/core";
import {Http,Response,Headers,RequestOptionsArgs,URLSearchParams,RequestOptions} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AddService{
  constructor(private http : Http){
    console.log("Add Sponsor Service Initiated...");
  }
  addSponsor(details: any):Observable<any>{
    let body = JSON.stringify(details);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options=new RequestOptions({headers:headers});

    return this.http.post("https://coxexecutiveforum.run.aws-usw02-pr.ice.predix.io/coxevent/user", body, options).map(res => res.json());
  }
}
