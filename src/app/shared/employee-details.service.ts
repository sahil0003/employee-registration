import { Injectable } from '@angular/core';
import { EmployeeDetails } from './employee-details.model';
import { HttpClient } from "@angular/common/http";
import { find, map, Observable, observable, subscribeOn } from 'rxjs';
import { ReactiveFormsModule} from '@angular/forms'
import { Router } from '@angular/router';
import { EmployeeDetailsDashboard } from './EmployeeDetailsDashboard';
import { getResponse } from './responsemapper';
import { MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailsService {
  public get http(): HttpClient {
    return this._http;
  }
  public set http(value: HttpClient) {
    this._http = value;
  }
  
  constructor(private _http: HttpClient, private router: Router, private authService: MsalService) { }
  formData:EmployeeDetails = new EmployeeDetails(); 
  responsebody: any = new getResponse();
  
  getempdetails(id=this.formData.techmid){
    return this.http.get<any>('http://localhost:8080/api/employees/emp/'+id)
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
