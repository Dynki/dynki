import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInfo } from 'firebase';

import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Store, Select, Actions, ofActionDispatched } from '@ngxs/store';
import { BaseState } from 'app/dyn-base/store/base.state';
import * as baseActions from '../../dyn-base/store/base.actions';
import { IMessages, IMessage } from '../store/message.model';
import * as messageActions from '../store/message.actions';
import * as moment from 'moment';

@Injectable()
export class MessagingService {

  private userInfo: UserInfo;

  @Select(BaseState.domainId)
  private domainId$: Observable<string>;
  private domainId = undefined;

  constructor(private db: AngularFirestore, private action$: Actions, private store: Store, private afAuth: AngularFireAuth) {
    this.action$.pipe(ofActionDispatched(baseActions.DomainLoaded))
      .subscribe(() => {
        this.domainId = this.store.selectSnapshot(BaseState.domainId);
      });

    this.afAuth.authState.subscribe(u => {
      this.userInfo = u
    });
  }

  getMessages() {
    console.log('Messaging::Service::getMessages');
    return this.db.collection('domains')
    .doc(this.domainId)
    .collection('users')
    .doc(this.afAuth.auth.currentUser.uid)
    .collection('messages').snapshotChanges()
    .pipe(
      map(a => {
        const messages = a.reduce((acc, curr) => {

          const newMsg = { id: curr.payload.doc.id, ...curr.payload.doc.data() as any};
          console.log(newMsg);
          newMsg.created = moment(newMsg.created.toDate()).toDate();
          return { messages: [...acc.messages, newMsg]};

        }, { messages: [] });

        return messages;
      })
    ).subscribe((messages: IMessages) => {
      this.store.dispatch(new messageActions.RefreshMessages(messages));
    })

  }

  getMessage(msgId: string) {
    console.log('Messaging::Service::getMessage::id::', msgId);
    return this.db.collection('domains')
    .doc(this.domainId)
    .collection('users')
    .doc(this.afAuth.auth.currentUser.uid)
    .collection('messages')
    .doc(msgId).snapshotChanges()
    .pipe(
      take(1)
    )
    .subscribe(b => {
        if (b.payload.exists) {
          const data = { id: b.payload.id, ...b.payload.data() } as any;
          data.created = moment(data.created.toDate()).toDate();

          this.store.dispatch(new messageActions.SetCurrentMessage(data));
        } else {
          return undefined;
        }
      });
  }

  sortMessages(msgs: IMessage[], order: string) {
    return msgs.sort((m1, m2) => {
      let filter;

      if (order === 'from') {
          filter = m1.from < m2.from ? -1 : (m1.from > m2.from ? 1 : 0);
      }

      if (order === 'oldest') {
          filter = m1.created < m2.created ? -1 : (m1.created > m2.created ? 1 : 0);
      }

      if (order === 'recent') {
          filter = m1.created < m2.created ? 1 : (m1.created > m2.created ? -1 : 0);
      }

      return filter;
    });
  }
}
