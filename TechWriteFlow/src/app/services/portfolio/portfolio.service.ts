import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User } from '../../shared/firestore-models/user.model';
import { Portfolio } from '../../shared/firestore-models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  userAliasCollection: AngularFirestoreCollection = this.firestore.collection("UserAlias");
  userCollection: AngularFirestoreCollection<User> = this.firestore.collection<User>("User");
  portfolioCollection: AngularFirestoreCollection<Portfolio> = this.firestore.collection<Portfolio>("Portfolio");

  constructor(
    private firestore: AngularFirestore
  ) { }

  /*
  * Check if portfolio exist by checking if alias exist, if not check if user with uid==alias exist
  */
  async portfolioExist(alias: string): Promise<boolean> {
    return new Promise(async(resolve) => {
      resolve((await this.aliasExist(alias))? true:(await this.isAliasUID(alias)?true:false))
    })
  }

  async getPortfolioByAlias(alias: string):Promise<Portfolio | null>{
    return new Promise(async(resolve)=>{

      let uid = await this.getUIDbyAlias(alias);
      if(!uid) uid = alias;

      await this.portfolioCollection.ref.doc(uid).get().then((docSnapshot)=>{
        if(docSnapshot.exists) resolve(docSnapshot.data() as Portfolio);
        else resolve(null);
      });
    })
  }

  async aliasExist(alias: string):Promise<boolean>{
    return new Promise(async(resolve)=>{
      await this.userAliasCollection.ref.doc(alias).get().then((docSnapshot) => {
        if (docSnapshot.exists) resolve(true);
        else resolve(false);
      })
    })
  }

  /*
  * Returns true if alias is user id(user not changed default alias), flase otherwise
  */
  async isAliasUID(alias: string):Promise<boolean>{
    return new Promise(async (resolve)=>{
      await this.userCollection.ref.doc(alias).get().then((userSnapshot) => {
        if (userSnapshot.exists) resolve(true);
        else resolve(false)
      })
    })
  }

  async getUIDbyAlias(alias:string):Promise<string | null>{
    return new Promise(async (resolve)=>{
      await this.userAliasCollection.ref.doc(alias).get().then((aliasSnapshot)=>{
        if (aliasSnapshot.exists) resolve((aliasSnapshot.data() as any).uid);
        else resolve(null);
      })
    })
  }


}
