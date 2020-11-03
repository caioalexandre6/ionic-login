
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  collectionName = 'users';

  constructor(
    private firestore: AngularFirestore
    
  ) { }


  read_students() {
    return this.firestore.collection(`users/`).snapshotChanges();
  }

 
}