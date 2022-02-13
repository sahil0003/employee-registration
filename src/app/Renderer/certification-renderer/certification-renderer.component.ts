import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-certification-renderer',
 template: `
<div class="dropdown">
    <button class="dropbtn" style="background-color: rgb(26, 1, 29); font-weight: 400;
    font-size: 18px;">  {{params}} {{params}} <i class="fa fa-caret-down"></i>
    <pre>{{params}}</pre>
</button>


    <div class="dropdown-content">

        <div class="dropdown-menu show" style="width: auto; background-color: rgba(12, 1, 17, 0.98); color: white;     " aria-labelledby="navbarDropdown">


            <a id="btnWebTour" class="dropdown-item" data-toggle="modal">Employee ID : {{params.techmid}}</a>
            <div class="dropdown-divider"></div>
            params | json
            
            <a id="btnWebTour" class="dropdown-item" data-toggle="modal">Job Description : {{params.job_code_des}}</a>
            <div class="dropdown-divider"></div>
         

        </div>
    </div>
</div>
  `,
  styleUrls: ['./certification-renderer.component.css']
})
export class CertificationRendererComponent implements ICellRendererAngularComp {
  
  params :any;
  label: string;
  rowData:any;

  agInit(params:any): void {
    this.params = params;
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event:any) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onClick(params);

    }
  }
}