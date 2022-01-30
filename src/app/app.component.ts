import { Component , OnInit} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'employee-registration';
  constructor(private authService: MsalService, private router: Router) {

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
  
}
