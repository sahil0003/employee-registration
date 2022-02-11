import { Component, OnInit } from '@angular/core';
import AWSS3UploadAshClient from 'aws-s3-upload-ash';
import { UploadResponse } from 'aws-s3-upload-ash/dist/types';
import { environment } from 'src/environments/environment';
import { EmployeeDashboardComponent } from '../employee-dashboard/employee-dashboard.component';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}
  private dash: EmployeeDashboardComponent
 
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
      this.dash.getEmployeeDetails()
  }

}
