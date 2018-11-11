import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { flatMap } from 'rxjs/operators';
import { Observable, of, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BaseService {

    constructor(
        private afAuth: AngularFireAuth,
        private httpClient: HttpClient
    ) { }

    getUserDomain(): Observable<any> {
        const url = 'https://us-central1-dynki-c5141.cloudfunctions.net/domains';
        return this.afAuth.idToken.pipe(
            flatMap(token => this.httpClient.get(url, { headers: { token, uid: this.afAuth.auth.currentUser.uid } }))
        )
   }
}
