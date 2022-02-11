import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-employee-sso',
  templateUrl: './employee-sso.component.html',
  styleUrls: ['./employee-sso.component.css']
})
export class EmployeeSSOComponent implements OnInit {

  constructor(private authService: MsalService, private router: Router) { }

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
    this.authService.loginRedirect();
  }
    logout() {
    this.authService.logout()
  }
}
