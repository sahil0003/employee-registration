import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalModule, MsalService } from '@azure/msal-angular';
import { IEditCell } from '@syncfusion/ej2-angular-grids';
import { map } from 'rxjs';
import { EmployeeDetails } from '../shared/employee-details.model';
import { EmployeeDetailsService } from '../shared/employee-details.service';
import { EmployeeDetailsDashboard } from '../shared/EmployeeDetailsDashboard';
import { getResponse } from '../shared/responsemapper';
import { role } from '../shared/role.model';
import { FileUploader, FileLikeObject } from 'ng2-file-upload'
import AWSS3UploadAshClient from 'aws-s3-upload-ash';
import { UploadResponse } from 'aws-s3-upload-ash/dist/types';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

columnDefs = [
    {headerName: 'TechM ID', field: 'techmid', sortable: true,width:120,filter:true, checkboxSelection:true,headerCheckboxSelection:true},
    {headerName: 'First Name', field: 'firstName',sortable: true,width:120,filter:true},
    {headerName: 'Last Name', field: 'lastName',sortable: true,width:120,filter:true},
    {headerName: 'Email', field: 'email',width:150,filter:true},
    {headerName: 'Project', field: 'project',sortable: true,width:100,editable:true,filter:true},
    /*{headerName: 'Manager', field: 'mgrid',sortable: true,width:100,filter:true,visible:false},
    {headerName: 'Role', field: 'role.role',filter:true,width:150,visible:false},*/
    {headerName: 'HyperScaler', field: 'hyperscaler',sortable: true,editable:true,filter:true,width:120, cellEditor:'agSelectCellEditor',
    cellEditorParams: {
      values: ['Azure','Aws','Gcp'],
  }
    },
   /* {headerName: 'Certification', field: 'certification_id',editable:true,filter:true, width:150,visible:false
  },*/
    {headerName: 'IBU', field: 'ibu',sortable: true,editable:true,filter:true,width:70},
    {headerName: 'IBG', field: 'ibg',sortable: true,editable:true,filter:true,width:70},
    {headerName: 'Cloud Certified', field: 'cloudCertified',sortable: true,editable:true,width:140,filter:true,
    cellEditor:'agSelectCellEditor',
    cellEditorParams: {
      values: ['Yes','No'],
  }},
    {headerName: 'Working On Cloud', field: 'workinOnCloud',sortable: true,width:150,filter:true, cellRenderer:'agGroupCellRenderer',
    cellEditor:'agSelectCellEditor',cellRendererParams: {
      
      values: ['Yes','No'] ,
         }
  },
    {headerName: 'Primary Scope Of Work', field: 'psoWork',sortable: true,editable:true,filter:true,width:175
    
     } ];


defaultColDef = {
};

  public employee = this.empservice.responsebody;
  constructor(private empservice: EmployeeDetailsService,private http: HttpClient, private router: Router, private authService: MsalService) {    
  }
  ngOnInit(
    
  ) { this.getEmployeeDetails(this.rawdata.techmid)
  } 

  employeeres1: getResponse= new getResponse();
  rowData:any ;
  rawdata=this.empservice.formData;
  
  getEmployeeDetails(id=this.rawdata.techmid){
    return this.http.get<any>('http://localhost:8080/api/employees/emp/mgr/'+id)
    .subscribe(data => {this.rowData = data})    
  }

putemp(data=this.rowData){
    this.http.put<any>('http://localhost:8080/api/employees/emp',data).subscribe(data => this.rowData = data);
  }
  
  onClick (){
    this.putemp()
  } 
 
  logout() {
    this.authService.logout()
  }

  fileSelected: any = null;
  config = {
    bucketName: 'csvtordscasestudy',
  
    region: 'us-east-1',
    accessKeyId: environment.AWS_ACCESS_KEY,
    secretAccessKey: environment.AWS_SECRET_KEY,
    s3Url: 'http://csvtordscasestudy.s3.amazonaws.com/ '
  }
  S3CustomClient: AWSS3UploadAshClient = new AWSS3UploadAshClient(this.config);

  onChangeFile(event: any) {
    console.log(event.target.files[0])
    this.fileSelected = event.target.files[0]
  }

  async handleSendFile() {
    
    console.log(environment)
    console.log("handleSendFile")
    await this.S3CustomClient
      .uploadFile(this.fileSelected, this.fileSelected.type, undefined, this.fileSelected.name, "private")
      .then((data: UploadResponse) => console.log(data))
      .catch((err: any) => console.error(err))
  }

  isManagerIn(){
    if(this.employee.role.role=="Project Manager" || this.employee.role.role=="Manager" || this.employee.role.role=="Admin") 
    {return true}
    else{
      return false
    }
  }

}
