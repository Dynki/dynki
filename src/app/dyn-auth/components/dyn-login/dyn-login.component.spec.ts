import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import * as Auth from '../shared/actions/auth';
import * as fromAuth from '../shared/reducers';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './dyn-login.component';
import { AuthService } from '../shared/dyn-auth.service';

describe('LoginComponent', () => {

  let instance: LoginComponent;
  let store: Store<fromAuth.State>;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot({
          auth: combineReducers(fromAuth.reducers),
        }),
      ],
      declarations: [LoginComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(LoginComponent);
    instance = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should dispatch a login event on submit', () => {
    const credentials = { username: 'user', password: 'pass' };
    const action = new Auth.Login(credentials);

    instance.form.setValue(credentials);
    instance.submit();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
