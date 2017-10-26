import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../components/header.component';
import { FooterComponent } from '../components/footer.component';
import { ValidateAdmin } from '../services/validateCredentials.service';

@Component({
  moduleId:module.id,
  selector: 'login',
  templateUrl: `./login.component.html`,
  styleUrls:['../stylesheets/login.css'],
  providers:[ValidateAdmin]
})
export class LoginComponent  {
  user:string;
  pwd:string;
  credentials:credentials;
  response:any;
  success:boolean;

  constructor(public ValidateAdmin : ValidateAdmin,private router:Router){
    this.user=null;
    this.pwd=null;
  }

  validate(){
    if(!this.user || !this.pwd){
      var x = document.getElementById("snackbar")
      x.className = "show";
      setTimeout(function() { x.className = x.className.replace("show", ""); }, 3000);
    }
    else{
      this.credentials={
        username:this.user,
        password:this.pwd
      }
      sessionStorage.setItem("Credentials",JSON.stringify(this.credentials));
      this.ValidateAdmin.validateAdmin(this.credentials).subscribe(returned=>{
        this.response=returned;
        sessionStorage.setItem('Sponsors',JSON.stringify(this.response));
        if(this.response.registeredUsers){
          this.success=true;
          window.location.href = '../#/forumadmin/dashboard';
        }
        else{
          this.success=false;
          document.getElementById('snackbar').innerHTML = "Incorrect Credentials";
          var x = document.getElementById("snackbar")
          x.className = "show";
          setTimeout(function() { x.className = x.className.replace("show", ""); }, 3000);
        }
      });
    }
  }
}
interface credentials{
  username:string;
  password:string;
}
