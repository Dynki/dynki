import { Component, OnInit, AfterViewInit } from '@angular/core';

import { AuthState } from '../../../dyn-auth/store/auth.state';
import { User } from '../../../dyn-auth/store/auth.model';
import { Select, Store, Actions, ofActionSuccessful, ofActionDispatched } from '@ngxs/store';
import { Observable } from 'rxjs/observable';

import * as menuActions from '../../../dyn-base/store/menu.actions';
import * as baseActions from '../../../dyn-base/store/base.actions';
import { BaseState } from 'app/dyn-base/store/base.state';
import { take } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'dyn-post-auth',
    templateUrl: './dyn-post-auth.component.html',
    animations: [
      trigger('bgImgTrigger', [
          state('none, void', style({
              opacity: '0'
          })),
          state('maximum', style({
              opacity: '1'
          })),
          transition('none => maximum', animate('200ms 2s'))
      ])
  ]
})

export class PostAuthComponent implements OnInit, AfterViewInit {
  state = 'none';

  @Select(AuthState.getUser)
  public user$: Observable<User>;

  @Select(BaseState.domainId)
  public domainId$: Observable<string>;
  public domainLoaded = false;

  constructor(private store: Store, private action$: Actions) { }

  ngAfterViewInit() {
      this.state = 'maximum';
  }

  ngOnInit() {
    this.store.dispatch(new baseActions.GetUserDomain());

    this.action$.pipe(ofActionDispatched(baseActions.DomainLoaded))
    .subscribe(() => {
      this.domainLoaded = true;
      console.log('Domain Loaded Fired');
      this.store.dispatch(new menuActions.InitMenus())
    });
  }
}
