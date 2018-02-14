/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ToolbarComponent } from './dyn-toolbar.component';
import { APP_BASE_HREF } from '@angular/common';
import { MatIconRegistry } from '@angular/material';
import { AuthService } from '../../dyn-auth/shared/dyn-auth.service';
import { AuthServiceMock } from '../../dyn-auth/shared/dyn-auth.service.mock';

describe('ToolbarComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ToolbarComponent
      ],
      providers: [
          MatIconRegistry,
          { provide: AuthService, useClass: AuthServiceMock },
          { provide: APP_BASE_HREF, useValue: '/' },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    TestBed.compileComponents();
  });

  it(`should raise toggle sidebar event when menu icon clicked`, async(() => {
    const fixture = TestBed.createComponent(ToolbarComponent);
    const comp = fixture.componentInstance;
    comp.notify.subscribe(ev => {
        expect(ev).toEqual('toggle sidebar');
    });
    comp.onClick();
  }));


  it(`should log out user when log out icon clicked`, async(() => {
    const fixture = TestBed.createComponent(ToolbarComponent);
    const comp = fixture.componentInstance;
    const authService = fixture.debugElement.injector.get(AuthService);
    comp.logout();
    // expect(authService.isLoggedIn).toEqual(false);
  }));
});
