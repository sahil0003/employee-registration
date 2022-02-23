import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from "@angular/router";

import { EmployeeLoginComponent } from './employee/employee-login/employee-login.component';
import { EmployeeDashboardComponent } from './employee/employee-login/employee-dashboard/employee-dashboard.component';
import { EmployeeDetails } from './shared/employee-details.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AgGridModule } from 'ag-grid-angular';
import { GridModule, EditService, ToolbarService, SortService } from '@syncfusion/ej2-angular-grids';

import { MsalModule, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { ActionsComponent } from './employee/employee-login/employee-dashboard/actions/actions.component';
import { CertificationRendererComponent } from './Renderer/certification-renderer/certification-renderer.component';
import { EmployeeDetailsService } from './shared/employee-details.service';
import { MatDialog } from '@angular/material/dialog';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '956e65f1-7223-4c8c-a635-4690708d866f',
      redirectUri: 'http://localhost:4200/login'
    }
  });
}

const routes: Routes=[
  {path:"", redirectTo:'login',pathMatch:'full'},
  {path:'action', component:ActionsComponent},
  {path:'login', component:EmployeeLoginComponent},
 /* {path:'registration',component:EmployeeDetailsComponent , data:{roles: "Admin"}},*/
  {path:'employee-dashboard',component:EmployeeDashboardComponent} 
]
@NgModule({
  declarations: [
    AppComponent,
    EmployeeLoginComponent,
    EmployeeDashboardComponent,
    ActionsComponent,
    CertificationRendererComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    AgGridModule.withComponents([CertificationRendererComponent]),
    GridModule,
    MsalModule,
   

  ],
 
  exports:[RouterModule], 
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    MsalService,
    EmployeeDetailsService
    

  ],
  
  bootstrap: [AppComponent],
})
export class AppModule { }
