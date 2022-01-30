import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from "@angular/forms";
import { EmployeeDetailsService } from 'src/app/shared/employee-details.service';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css']
})
export class EmployeeLoginComponent implements OnInit {

  constructor(public service:EmployeeDetailsService) { }

  ngOnInit(): void {
  }
  onSubmit(loginform:NgForm){
    this.service.getempdetails();
  }


}
