import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/user.interface';
import { Observable, of } from 'rxjs';
import { FirebaseService } from '../services/usersCrud';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
 public userList: Array<any>;
 public user$: Observable<any>;
 public user: User;
 
 





  constructor(
   private authSvc: AuthService,
   private router: Router,
   public afAuth: AngularFireAuth,
   public services: FirebaseService,
   public activatedRoute : ActivatedRoute,
   
   

  ) 
  {
    this.user$ = this.authSvc.user$;
    this.activatedRoute.queryParams.subscribe((res) => {
      this.user = JSON.parse(res.value);
      console.log(this.user);
 
     });
  }
 

  async logout(): Promise<void> {
    try {
      await this.authSvc.logout();
      this.router.navigate(['login']);
    } catch (error) {
      console.log('Error->', error);
    }
  }

 

  ngOnInit() {
    this.services.read_students().subscribe(data => {

      this.userList = data.map(e => {
        return {
          id: e.payload.doc.id,
          displayName: e.payload.doc.data()['displayName'],
        };
      })
      console.log(this.userList);
    });
  }

}