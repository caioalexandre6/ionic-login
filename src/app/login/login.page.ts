import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/user.interface';
import { NavController } from '@ionic/angular';
import { AdminPage } from '../admin/admin.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  
  public userFace: User;
  constructor(
     private authSvc: AuthService,
     private router: Router,
     public navCtrl: NavController,

     )
      {
      }

 

  async onLogin(email, password) {
    try {
      const user = await this.authSvc.login(email.value, password.value);
      console.log(user);
      if (user) {
        const isVerified = this.authSvc.isEmailVerified(user);
        this.userFace = user; 
        this.redirectUser(isVerified);
      }
    } catch (error) {
      console.log('Error->', error);
    }
  }
 
 

  async onLoginGoogle() {
    try {
      const user = await this.authSvc.loginGoogle();
      if (user) {
        const isVerified = this.authSvc.isEmailVerified(user);
        this.userFace = user; 
        this.redirectUser(isVerified);
        
      }
    } catch (error) {
      console.log('Error->', error);
    }
  }

  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.navCtrl.navigateForward(['admin'], {
        queryParams: {
          value: JSON.stringify(this.userFace)
        },
      }
  
      );
    } else {
      this.router.navigate(['verify-email']);
    }
  }
}
