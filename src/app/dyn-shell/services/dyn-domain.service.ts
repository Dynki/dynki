import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { flatMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Actions, ofActionDispatched, Store } from '@ngxs/store';
import * as baseActions from '../../dyn-base/store/base.actions';
import { BaseState } from 'app/dyn-base/store/base.state';
import { AngularFirestore } from '@angular/fire/firestore';
import * as shellActions from '../store/shell.actions';

@Injectable()
export class DomainService {

    private domainId: string;

    constructor(
        private db: AngularFirestore,
        private afAuth: AngularFireAuth,
        private httpClient: HttpClient,
        private action$: Actions,
        private store: Store
    ) {
        this.action$.pipe(ofActionDispatched(baseActions.DomainLoaded))
        .subscribe(() => {
            this.domainId = this.store.selectSnapshot(BaseState.domainId);
        });
    }

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
                {
                    uid: this.afAuth.auth.currentUser.uid,
                    name: name,
                    email: this.afAuth.auth.currentUser.email,
                    displayName: this.afAuth.auth.currentUser.displayName
                },
                { headers: { token, uid: this.afAuth.auth.currentUser.uid } }))
        )
    }

    getMembers() {
        console.log('Domain::Service::getMessages');
        return this.db.collection('domains')
        .doc(this.domainId)
        .collection('users')
        .snapshotChanges()
        .pipe(
          map(a => {
            const members = a.reduce((acc, curr) => {
              const user = { id: curr.payload.doc.id, ...curr.payload.doc.data() as any};
              return [...acc, user];
            }, []);
            return members;
          })
        ).subscribe((members) => {
          this.store.dispatch(new shellActions.RefreshDomainMembers(members));
        });
    }
}
