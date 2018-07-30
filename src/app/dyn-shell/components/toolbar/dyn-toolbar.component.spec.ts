/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { APP_BASE_HREF } from '@angular/common';

import { NgxsModule } from '@ngxs/store';

import { ToolbarComponent } from './dyn-toolbar.component';
import { MockAuthState } from '../../../shared/mocks/auth.state.mock';
import { MdcAppBarModule } from '../../../../../node_modules/@angular-mdc/web';
import { OverlayModule, OVERLAY_PROVIDERS } from '@angular/cdk/overlay';
import { NgZorroAntdModule } from '../../../../../node_modules/ng-zorro-antd';

describe('ToolbarComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgZorroAntdModule,
        NgxsModule.forRoot([MockAuthState])
      ],
      declarations: [ToolbarComponent],
      providers: [
        OVERLAY_PROVIDERS,
          { provide: APP_BASE_HREF, useValue: '/' },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    TestBed.compileComponents();
  });

  it(`should raise toggle sidebar event when menu icon clicked`, async(() => {
    const fixture = TestBed.createComponent(ToolbarComponent);
    const comp = fixture.componentInstance;
    // comp.notify.subscribe(ev => {
    //     expect(ev).toEqual('toggle sidebar');
    // });
    // comp.onClick();
  }));


  it(`should log out user when log out icon clicked`, async(() => {
    const fixture = TestBed.createComponent(ToolbarComponent);
    const comp = fixture.componentInstance;
    // const authService = fixture.debugElement.injector.get(AuthService);
    // comp.logout();
    // expect(authService.isLoggedIn).toEqual(false);
  }));
});
