import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MsalModule, MsalService } from '@azure/msal-angular';
import { IEditCell } from '@syncfusion/ej2-angular-grids';
import { map } from 'rxjs';
import { EmployeeDetails } from '../../../shared/employee-details.model';
import { EmployeeDetailsService } from '../../../shared/employee-details.service';
import { EmployeeDetailsDashboard } from '../../../shared/EmployeeDetailsDashboard';
import { getResponse } from '../../../shared/responsemapper';
import { role } from '../../../shared/role.model';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import AWSS3UploadAshClient from 'aws-s3-upload-ash';
import { UploadResponse } from 'aws-s3-upload-ash/dist/types';
import { environment } from 'src/environments/environment';
import { AppComponent } from '../../../app.component';
import { Grid , GridOptions, GridApi,GridParams, GridOptionsWrapper, CellClickedEvent } from 'ag-grid-community';
import { CertificationRendererComponent } from '../../../Renderer/certification-renderer/certification-renderer.component';



@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})


export class EmployeeDashboardComponent implements OnInit {
  private gridApi: any;
  gridColumnApi:any; 
  private rowSelection:any;
  responsebody:any;
  responsebody1:any;
  rawData :any; 
  rowData:any;
  frameworkComponents: any;
  rowDataClicked1 = {};
  label:any
  formData:any ;
  $: any;
 
  constructor( private empservice: EmployeeDetailsService , private http: HttpClient, private router: Router, private authService: MsalService) {    
    this.frameworkComponents = {
      certificationRendererComponent: CertificationRendererComponent,
    }
    this.formData = empservice.formData 
 
  }
 
 
  ngOnInit() 
  { this.getEmployeeDetails1(this.formData.techmid), 
    this.getEmployeeDetails(this.formData.techmid),
    this.getRowData()
  }

  getEmployeeDetails(id=localStorage.getItem(this.formData.techmid)){
    return this.http.get<any>('http://localhost:8080/api/employees/emp/employees/'+id)
    .subscribe(data => {this.rowData = data} )
    
  }

  getEmployeeDetails1(id=this.formData.techmid){ return this.http.get<any>('http://localhost:8080/api/employees/emp/'+id)
  .subscribe(data => {this.responsebody = data
    console.log(this.formData.techmid)
  })}

    /*onCellClicked(event: CellClickedEvent) { 
      console.log('Cell was clicked')
    }
*/
  //update data
 putemp(data=this.rowData){
    this.http.put('http://localhost:8080/api/employees/emp',data);
  }

  uploadData(data=this.rowData){
    this.http.put('http://localhost:8080/api/employees/emp',data).subscribe(data => {this.responsebody = data
    console.log(this.formData.techmid)
  })
  }

  
  logout() {
    this.authService.logout()
  } 

  
  // upload file to S3

  fileSelected: any = null;
  config = {
    bucketName: 'awsrdsbucket1',
    region: 'us-east-1',
    accessKeyId: "AKIAWFNVRFG7BA6GA6X2",
    secretAccessKey: "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",
    s3Url: 'http://awsrdsbucket1.s3.amazonaws.com/ '
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
      .then((data: UploadResponse) => alert("File Uploaded Successfully"))
      .catch((err: any) => alert(err))
      this.getEmployeeDetails(this.formData.techmid)
  }


  // Ag grid

columnDefs = [
  {headerName: 'TechM ID', field: 'techmid', sortable: true,width:130,filter:true,colId:'techmid',
   checkboxSelection:true,headerCheckboxSelection:true},

  {headerName: 'First Name', field: 'first_NAME',sortable: true,width:120,filter:true, },

  {headerName: 'Last Name', field: 'last_NAME',sortable: true,width:120,filter:true},

  {headerName: 'Employee IBU', field: 'employee_ibu',sortable: true,width:130,filter:true},

  {headerName: 'Project', field: 'project',sortable: true,width:100,filter:true},

  {headerName: 'Primary Competency', field: 'primary_competency',
  cellClass: ['editable'] ,sortable: true,editable:true,width:180,filter:true,
  cellEditor:'agSelectCellEditor', cellEditorParams: { values: ['ADMS','Infra','Security','SAP','Oracle Apps','Network Services','IOT','Data Analytics'],} },
 
  {headerName: 'Working On Cloud Scope', field: 'workinOnCloud',
    cellClass: ['editable'] ,sortable: true,editable:true,width:180,filter:true,
    cellEditor:'agSelectCellEditor', cellEditorParams: { values: ['Yes','No'],} },

  {headerName: 'HyperScaler', field: 'hyperscaler',cellClass: "editable",sortable: true,editable:true,width:180,
  filter:true, cellEditor:'agSelectCellEditor', cellEditorParams: { values: ['AWS','AZURE','GCP','Oracle','IBM']}},

  
  {headerName: 'Primary Scope Of Work', field: 'psoWork',
    cellClass: ['editable'] ,sortable: true,editable:true,width:180,filter:true,
    cellEditor:'agSelectCellEditor', cellEditorParams: {values: ['Devops','Developer',''],}},
  
  {headerName: 'Cloud Certifification', field: 'certified', colId: 'certificationdata', sortable: true,width:200,filter:true, },    
  /*
  {headerName: 'Certifications',  cellRenderer: 'certificationRendererComponent' ,width:130,
    cellRendererParams: { onClick: this.onBtnClick1.bind(this), label: 'certified'}},*/
  
  {headerName: 'Job Code Description', field: 'job_CODE_DES',sortable: true,width:150,filter:true},
  
  {headerName: 'Customer Group Name', field: 'cust_GROUP_NAME',sortable: true,width:150,filter:true},
  
  {headerName: 'Skills', field: 'skills',sortable: true,width:150,filter:true},
  
  {headerName: 'IBU', field: 'ibu',sortable: true,filter:true,width:70},
  
  {headerName: 'IBG', field: 'ibg',sortable: true,filter:true,width:70},
  
  {headerName: 'Email', field: 'email',filter:true,width: 155,},
  
  {headerName: 'Resigned', field: 'resigned',sortable: true,filter:true,width:130,},
  /*
  {headerName: 'Button Col 1',  cellRenderer: 'certificationRendererComponent',
    cellRendererParams: { onClick: this.onBtnClick1.bind(this), label: 'Click 1'}
  }*/
 
];
onRowClicked(event: any) {this.$("#imagemodal").modal("show");}
  defaultColDef = {
  };

  
  private params: any;
  agInit(params:any): void {
    this.params = params;
  }
  onBtnClick() {
    this.params.clicked(this.params.value);
  }
  onBtnClick1(e:any) {
    this.rowDataClicked1 = e.rowData.techmid;
   return this.http.get<any>('http://localhost:8080/api/employees/emp/'+this.rowDataClicked1)
  .subscribe(data => {this.responsebody1 = data.certification
    console.log(this.responsebody1 )
    alert(this.responsebody1.certification_name)
  })
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
  }
  getRowData() {
    let RowData = [];
    this.gridApi.forEachNode((node: { data: any; }) => this.rowData.push(node.data));
    const techmids = this.rowData.map(((row:  any) => row['techmid']));
    console.log(this.rowData); 
    console.log(techmids); 
  }
 /*
  onCellClicked(event:any)  {
    if(true){
      const cellRendererInstances = event.api.getCellRendererInstances({
        rowNodes: [event.node],
        columns: [event.column],
        
        

      });
      if (cellRendererInstances.length > 0) {
        const instance =
          cellRendererInstances[0].getFrameworkComponentInstance();
        instance.togglePopup();
        console.log(event.node)
      }
    }*/
  
}

  //role authentication
  /*isManagerIn(){
    if(this.employee.role.role=="Project Manager" || this.employee.role.role=="Manager" || this.employee.role.role=="Admin") 
    {return true}
    else{
      return false
    }
  }
  
  onCellEditingStarted: function (event) {
      var displayModel = GridOptions.api.getModel();
      var rowNode = displayModel.rowsToDisplay[event.rowIndex];
      rowNode.setRowHeight(100);
      gridOptions.api.onRowHeightChanged();
  },
  */


    /*{headerName: 'Manager', field: 'mgrid',sortable: true,width:100,filter:true,visible:false},
  {headerName: 'Role', field: 'role.role',filter:true,width:150,visible:false},*/
 
  /*{headerName: 'Certification', field: 'certification_id',editable:true,filter:true, width:150,visible:false
  },*/