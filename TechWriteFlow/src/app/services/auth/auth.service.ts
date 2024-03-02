import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { User } from '../../shared/firestore-models/user.model';
import { Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { Portfolio } from '../../shared/firestore-models/portfolio.model';
import { Blog } from '../../shared/firestore-models/blog.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User | null | undefined> = of(null);

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,

  ) {
    this.user$ = this.afAuth.authState.pipe(switchMap(user => {
      //if logged in
      if (user) {
        return this.userCollection.doc<User>(user.uid).valueChanges();
      }
      //if logged out
      else {
        return of(null);
      }
    }))
  }

  userCollection: AngularFirestoreCollection<User> =
    this.firestore.collection<User>("User");
  portfolioCollection: AngularFirestoreCollection<Portfolio> =
    this.firestore.collection<Portfolio>("Portfolio");
  blogCollection: AngularFirestoreCollection<Blog> =
    this.firestore.collection<Blog>("Blog");
  /*
    Logs into a google account, if the account does not yet exist creates:
    - new user document 
    - blog document
    - portfolio document
  */
  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential: any = await this.afAuth.signInWithPopup(provider);

    if (!(await this.userExist(credential.user.uid))) {
      await this.createEmptyBlog(credential.user);
      await this.createEmptyPortfolio(credential.user);
      await this.createUserDocument(credential.user);

      this.router.navigate(['/profile-settings/alias']);
      return;
    }

    this.router.navigate(['/admin-panel']);
  }

  async userExist(uid: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.userCollection.ref.doc(uid).get().then((docSnapshot) => {
        if (docSnapshot.exists) resolve(true);
        else resolve(false);
      });
    })
  }

  /*
    Creates a user document with id identical to account id 
  */
  private async createUserDocument(user: any) {
    let userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      alias: user.uid,
      description: ''
    }

    await this.userCollection.ref.doc(user.uid)
      .set(userData, { merge: true })
      .catch((error) => {
        console.error("Error while creating user document: ", error);
      })
  }

  /*
  *  Creates a new Portfolio document with id identical to account id 
  */
  private async createEmptyPortfolio(user: any) {
    let portfolio: Portfolio = {
      uid: user.uid,
      public: false,
      projects: []
    }

    await this.portfolioCollection.ref.doc(user.uid)
      .set(portfolio, { merge: true })
      .catch((error) => {
        console.error("Error while creating portfolio document: ", error);
      })
  }

  /*
  *  Creates a new Blog document with id identical to account id 
  */
  private async createEmptyBlog(user: any) {
    let blog: Blog = {
      uid: user.uid,
      public: false,
      posts: []
    }

    await this.blogCollection.ref.doc(user.uid)
      .set(blog, { merge: true })
      .catch((error) => {
        console.error("Error while creating blog document: ", error);
      })
  }

}
