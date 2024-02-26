import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { User } from './user';
import { Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  userCollection: AngularFirestoreCollection<User> = this.firestore.collection<User>("User");

  /*
    Logs into a google account, if the account does not yet exist creates a new user document
  */
  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential: any = await this.afAuth.signInWithPopup(provider);

    if (!(await this.userExist(credential.user.uid))){
      await this.createUserDocument(credential.user);
    }
      
    this.router.navigate(['/admin-page']);
  }

  async userExist(uid: string):Promise<boolean>{
    return new Promise((resolve)=>{
      this.userCollection.ref.doc(uid).get().then((docSnapshot) => {
        if (docSnapshot.exists) resolve(true);
        else resolve(false);
      });
    })
  }

  /*
    Creates a user document with id identical to account id 
  */
  async createUserDocument(user:any){
    let userData: User={
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      alias: user.uid
    }

    await this.userCollection.ref.doc(user.uid)
      .set(userData, { merge: true })
      .catch((error)=>{
        console.error("Error while creating user document: ", error);
      })
  }

}
