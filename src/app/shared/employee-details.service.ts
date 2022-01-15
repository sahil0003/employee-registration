import { Injectable } from '@angular/core';
import { EmployeeDetails } from './employee-details.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailsService {

  constructor() { }
  formData:EmployeeDetails = new EmployeeDetails(); 
}
