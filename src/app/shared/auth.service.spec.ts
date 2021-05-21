import {TestBed} from '@angular/core/testing';

import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {User} from './user.model';

class MockHttpClient {
  constructor() {
  }

  post(endpoint, body): Observable<any> {
    return of({
      headers: new HttpHeaders('content-type'),
      body: {
        email: 'prueba@gmail.com',
        password: 'prueba',
        token: '1234'
      }
    });
  }
}

class MockRouter {
  constructor() {
  }

  navigate(object): MockRouter {
    return this;
  }

  then(): void {
  }
}

describe('AuthService', () => {
  let service: AuthService;
  let user: User;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: new MockHttpClient()},
        {provide: Router, useValue: new MockRouter()}
      ]
    });
    service = TestBed.inject(AuthService);
    user = {
      email: 'prueba@gmail.com',
      password: 'prueba',
      token: '1234'
    };
  });

  it('given authService when login then return user', () => {
    service.login('prueba@gmail.com', 'prueba').subscribe(response => {
      expect(response).toBe(user);
    });
  });



});
