import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User as IUser } from '../shared/auth/user';
import { error } from 'node:console';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AccountSettingsService {

  userAliasCollection: AngularFirestoreCollection = this.firestore.collection("UserAlias");
  userCollection: AngularFirestoreCollection<IUser> = this.firestore.collection<IUser>("User");

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  /*
  Returns null if user is not logged in or uid if logged
  */
  private getCurrentUserUID(): Promise<string | null>{
    return new Promise(async (resolve) => {
      let user = await this.afAuth.currentUser;
      if (user) resolve(user.uid)
      else resolve(null);
    })
  }

  async getCurrentUserAlias(): Promise<string> {
    return new Promise(async (resolve) => {
      let uid: string | null = await this.getCurrentUserUID();

      if (uid == null) {
        console.error("You are not logged in");
        resolve('');
      }

      this.userCollection.ref.doc(uid as any).get().then((userSnapshot) => {
        if (userSnapshot.exists) {
          let alias = (userSnapshot.data() as IUser).alias;
          resolve((alias) ? alias : '');
        } else {
          console.error("User with id: " + uid + " does not exist");
          resolve('');
        }
      })
    })
  }

  // checks if alias exists in UserAlias collection
  async checkIfAliasIsUnique(name: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.userAliasCollection.ref.doc(name).get().then((docSnapshot) => {
        if (docSnapshot.exists) resolve(false);
        else resolve(true);
      })
    })
  }

  /*
  Delete old alias if was not uid,
  Create new alias,
  Update alias in user document
  */
  async setNewAliasForCurrentUser(alias: string) {
    console.log("setting alias")

    let currentAlias: string = await this.getCurrentUserAlias();

    //check if current alias is taken, if yes delete it
    //(uid - default alias is not in UserAlias collection)
    if (!await this.checkIfAliasIsUnique(currentAlias)) {
      this.userAliasCollection.ref.doc(currentAlias).delete().catch((error) => {
        console.error("Error while removing alias - " + currentAlias + ":", error);
        return;
      })
    }

    // Create new alias
    let uid: string | null = await this.getCurrentUserUID();
    this.userAliasCollection.ref.doc(alias).set({uid: uid}, { merge: true }).catch((error)=>{
      console.error("Error while adding alias: ", error);
      return
    })

    // Update user document
    this.userCollection.ref.doc(uid as any).update({alias: alias}).catch((error)=>{
      console.error("Error while updating user("+uid+") document: ", error);
      return
    })
  }
}
