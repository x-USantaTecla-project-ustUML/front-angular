import {TestBed} from '@angular/core/testing';

import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';
import {User} from './user.model';
import {HttpService} from './http.service';

class MockHttpService {
  constructor() {
  }

  authBasic(email, password): MockHttpService {
    return this;
  }

  post(endpoint): Observable<any> {
    return of({
      token: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYmYiOjE2MjIxODg1NTksInJvbGUiOiJBVVRIRU5USUNBVEVEIiwiaXNzIjoidXNhbnRhdG' +
        'VjbGEiLCJuYW1lIjoicHJ1ZWJhQGdtYWlsLmNvbSIsImV4cCI6MTYyMjIwNjU1OSwiaWF0IjoxNjIyMTg4NTU5LCJ1c2VyIjoicHJ1ZWJhQGdtYWlsLmNvbSJ9.' +
        'shbFdClQHXfwiwk7BfDTCqsCOpx4fi2LPIYe83kRysA'
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
        {provide: HttpService, useValue: new MockHttpService()},
        {provide: Router, useValue: new MockRouter()}
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('given authService when login then return user', (done) => {
    user = {
      email: 'prueba@gmail.com',
      password: 'prueba',
      token: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYmYiOjE2MjIxODg1NTksInJvbGUiOiJBVVRIRU5USUNBVEVEIiwiaXNzIjoidXNhbnRhdGVjb' +
        'GEiLCJuYW1lIjoicHJ1ZWJhQGdtYWlsLmNvbSIsImV4cCI6MTYyMjIwNjU1OSwiaWF0IjoxNjIyMTg4NTU5LCJ1c2VyIjoicHJ1ZWJhQGdtYWlsLmNvbSJ9.shbFdC' +
        'lQHXfwiwk7BfDTCqsCOpx4fi2LPIYe83kRysA'
    };
    const serviceResponse = {
      token: user.token,
      email: user.email
    };
    service.login('prueba@gmail.com', 'prueba').subscribe(response => {
      expect(response).toEqual(serviceResponse);
      expect(service.getPassword()).toBe(user.password);
      expect(service.getEmail()).toBe(user.email);
      expect(service.getToken()).toBe(user.token);
      done();
    });
  });



});
