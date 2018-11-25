import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInfo } from 'firebase';

import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Store, Select, Actions, ofActionDispatched } from '@ngxs/store';
import { BaseState } from 'app/dyn-base/store/base.state';
import * as baseActions from '../../dyn-base/store/base.actions';
import { IMessages } from '../store/message.model';
import * as messageActions from '../store/message.actions';

@Injectable()
export class MessagingService {

  private userInfo: UserInfo;
  private messages: IMessages = {
    messages: [
      {
        id: '232425t34534',
        from: 'Dynki Team',
        to: ['Dean Selvey'],
        subject: 'Welcome to Dynki',
        body: [
          { insert: 'Hi @Dean Selvey,' },
          { insert: '\n' },
          { insert: '\n' },
          { insert: 'Thanks for choosing to give us a try.' },
          { insert: '\n' },
          { insert: 'You can now invite your people to your team.' },
          { insert: '\n' },
          { insert: '\n' },
          { insert: 'Once again thanks for choosing us.' },
          { insert: '\n' },
          { insert: '\n' },
          { insert: 'Regards' },
          { insert: '\n' },
          { insert: 'Team Dynki', attributes: { bold: true } }
        ],
        sent: true,
        created: new Date(),
        author: 'Dynki Team',
        status: 'Unread',
        read: false
      },
      {
        id: '232425t345eqweq34',
        from: 'Mark Webber',
        to: ['Dean Selvey'],
        subject: 'Abu Dhabi GP',
        body: [
          { insert: 'Hiya,' },
          { insert: '\n' },
          { insert: '\n' },
          { insert: 'Are you watching the qualifying?.' },
          { insert: '\n' },
          { insert: 'I hope Danny Ric does well.' },
        ],
        sent: true,
        created: new Date(),
        author: 'Mark Webber',
        status: 'read',
        read: true
      },
      {
        id: '232425t3sdarew45eqweq34',
        from: 'Fernando Alonso',
        to: ['Dean Selvey'],
        subject: 'Abu Dhabi GP',
        body: [
          { insert: 'Hola,' },
          { insert: '\n' },
          { insert: '\n' },
          { insert: 'Thanks for supporting me on my last race.' },
          { insert: '\n' },
          { insert: 'Lets hope the bloody car makes it' },
        ],
        sent: true,
        created: new Date(),
        author: 'Mark Webber',
        status: 'read',
        read: true
      }]
  }

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
    this.store.dispatch(new messageActions.RefreshMessages(this.messages));
  }

  getMessage(id: string) {
    console.log('Messaging::Service::getMessage::id::', id);
    this.store.dispatch(new messageActions.SetCurrentMessage(this.messages.messages.find(m => m.id === id)));
  }
}
