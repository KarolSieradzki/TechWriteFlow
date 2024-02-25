import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AccountSettingsService {

  userAliasCollection: AngularFirestoreCollection = this.firestore.collection("UserAlias");

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  async isUniqueName(name: string):Promise<boolean>{
    return new Promise((resolve)=>{
      this.userAliasCollection.ref.doc(name).get().then((docSnapshot)=>{
        if (docSnapshot.exists) resolve(true);
        else resolve(false);
      })
    })
  }

  async getUserUniqeName(uid: string){
    
  }
}
