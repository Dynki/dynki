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
import * as moment from 'moment';

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
        body: {
          ops: [
          { insert: 'Hi @Dean Selvey, \n\n' +
          'Thanks for choosing to give us a try. \n' +
          'You can now invite your people to your team. \n\n' +
          'Once again thanks for choosing us. \n\n' +
          'Regards \n' },
          { insert: 'Team Dynki', attributes: { bold: true } }
        ]},
        sent: true,
        created: moment().year(2018).month(10).date(26).hour(21).minute(15).toDate(),
        author: 'Dynki Team',
        status: 'Unread',
        read: false,
        selected: false
      },
      {
        id: '232425t345eqweq34',
        from: 'Mark Webber',
        to: ['Dean Selvey'],
        subject: 'Abu Dhabi GP',
        body: {
          ops: [
          { insert: 'Hiya, \n\n' +
          'Are you watching the qualifying?.\n' +
          'I hope Danny Ric does well.' },
        ]},
        sent: true,
        created: moment().year(2018).month(10).date(20).hour(9).minute(15).toDate(),
        author: 'Mark Webber',
        status: 'read',
        read: false,
        selected: false
      },
      {
        id: '232425t3sdarew45eqweq34',
        from: 'Fernando Alonso',
        to: ['Dean Selvey'],
        subject: 'Abu Dhabi GP',
        body: {
          ops: [
          { insert: 'Hola, \n\n' +
          'Thanks for supporting me on my last race.\n' +
          'Lets hope the bloody car makes it' },
        ]},
        sent: true,
        created: moment().year(2018).month(8).date(19).hour(18).minute(45).toDate(),
        author: 'Mark Webber',
        status: 'read',
        read: true,
        selected: false
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
