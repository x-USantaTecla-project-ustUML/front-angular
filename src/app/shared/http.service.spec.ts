import {TestBed} from '@angular/core/testing';

import {HttpService} from './http.service';
import {Observable, of, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

class MockHttpClient {
  constructor() {
  }
  post(endpoint, body, options): Observable<any> {
    if (endpoint === 'unauthorized') {
      return throwError({
        status: HttpService.UNAUTHORIZED,
        error: { error: 'Unauthorized', message: 'Test', code: HttpService.UNAUTHORIZED }
      });
    }
    if (endpoint === 'refuse') {
      return throwError({
        status: HttpService.CONNECTION_REFUSE,
        error: { error: 'Connection Refuse', message: 'Test', code: HttpService.CONNECTION_REFUSE }
      });
    }
    if (endpoint === 'custom_error') {
      return throwError({
        status: 400,
        error: { error: 'Bad Request', message: 'Test', code: 400 }
      });
    }
    if (endpoint === 'empty_content_type') {
      return of({
        headers: new HttpHeaders()
      });
    }
    return of({
      headers: new HttpHeaders('content-type'),
      body
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

describe('HttpService', () => {
  let service: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: new MockHttpClient() },
        { provide: Router, useValue: new MockRouter() }
      ]
    });
    service = TestBed.inject(HttpService);
  });

  it('given httpService when post unauthorized then catch error', () => {
    service.post('unauthorized').subscribe(response => {}, error => {
      expect(error).toBe('Unauthorized');
    });
  });

  it('given httpService when post connection refused then catch error', () => {
    service.post('refuse').subscribe(response => {}, error => {
      expect(error).toBe('Connection Refuse');
    });
  });

  it('given httpService when post custom error then catch error', () => {
    service.post('custom_error').subscribe(response => {}, error => {
      expect(error).toBe('Bad Request (400): Test');
    });
  });

  it('should httpService when post without content then return', () => {
    service.post('empty_content_type').subscribe(response => {
      expect(response.body).toBeUndefined();
    });
  });

  it('given httpService when post with content then return', () => {
    service.post('', {}).subscribe(response => {
      expect(response.body).toBeTruthy();
    });
  });

});
