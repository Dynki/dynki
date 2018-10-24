import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';
import * as firebase from 'firebase/app';

@Injectable()
export class BaseService {

    private domainCollectionName = 'user-domains';

    constructor(
        private db: AngularFirestore,
        private afAuth: AngularFireAuth,
        private fns: AngularFireFunctions
    ) { }

    async getUserDomain(): Promise<any> {
        try {
            const callable = firebase.functions().httpsCallable('getUserDomain');
            const returnVal = await callable({ uid: this.afAuth.idToken });
            return returnVal;
        } catch (error) {
            return error;
        }
   }
}
