import { Component , OnInit} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { getResponse } from './shared/responsemapper';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { EmployeeDetails } from './shared/employee-details.model';
import { EmployeeDetailsService } from './shared/employee-details.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'employee-registration';

  constructor(private authService: MsalService, private router: Router,private _http: HttpClient )  {
    

  }
  ngOnInit(): void {
    this.authService.instance.handleRedirectPromise().then( res => {
      if (res != null && res.account != null) {
        this.authService.instance.setActiveAccount(res.account)
        this.router.navigate(['login'])
      }
    })
 
  }
 

  isLoggedIn(): boolean {
  
    return this.authService.instance.getActiveAccount() != null
    
  }

  login() {
    // this.authService.loginRedirect();

    this.authService.loginRedirect();
  }

  logout() {
    this.authService.logout()
  }

  
  responsebody: any = new getResponse();
  rowData:any;
 
  formData : EmployeeDetails = new EmployeeDetails();
  getempdetails(){
   
    return this._http.get<any>('http://localhost:8080/api/employees/emp/'+this.formData.techmid)
    .subscribe(data => {this.responsebody = data

      if (this.responsebody){
        console.log(this.formData.techmid);

        this.router.navigate(['employee-dashboard']);
      }
      else{
        alert("Login Failed")
      }
    })   
  }
}
