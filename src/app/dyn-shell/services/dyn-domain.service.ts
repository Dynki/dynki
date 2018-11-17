import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DomainService {

    constructor(
        private afAuth: AngularFireAuth,
        private httpClient: HttpClient
    ) { }

    checkUserDomain(name: string): Observable<any> {
        const url = `https://us-central1-dynki-c5141.cloudfunctions.net/checkdomain/${name}`;
        return this.afAuth.idToken.pipe(
            flatMap(token => this.httpClient.get(url, { headers: { token, uid: this.afAuth.auth.currentUser.uid } }))
        )
    }

    createDomain(name: string): Observable<any> {
        const url = `https://us-central1-dynki-c5141.cloudfunctions.net/domains`;
        return this.afAuth.idToken.pipe(
            flatMap(token => this.httpClient.post(
                url,
                { uid: this.afAuth.auth.currentUser.uid, name: name },
                { headers: { token, uid: this.afAuth.auth.currentUser.uid } }))
        )
    }
}
