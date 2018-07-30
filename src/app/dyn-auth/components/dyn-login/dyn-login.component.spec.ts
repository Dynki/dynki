import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './dyn-login.component';
import { MockAuthState } from '../../../shared/mocks/auth.state.mock';
import { NgxsModule } from '../../../../../node_modules/@ngxs/store';

import { NgZorroAntdModule } from '../../../../../node_modules/ng-zorro-antd';
describe('LoginComponent', () => {

  let instance: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgZorroAntdModule,
        NgxsModule.forRoot([MockAuthState]),
        ReactiveFormsModule,
      ],
      declarations: [LoginComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(LoginComponent);
    instance = fixture.componentInstance;
  });

  it('should dispatch a login event on submit', () => {
    const credentials = { username: 'user', password: 'pass' };
    // const action = new Auth.Login(credentials);

    // instance.form.setValue(credentials);
    // instance.submit();

    // expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
