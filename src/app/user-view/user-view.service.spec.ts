import { TestBed } from '@angular/core/testing';

import { UserViewService } from './user-view.service';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpService} from '../shared/http.service';

class MockHttpService {
  constructor() {
  }

  get(endpoint): Observable<any> {
    return of({});
  }
}

describe('UserViewService', () => {
  let service: UserViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpService, useValue: new MockHttpService() }]});
    service = TestBed.inject(UserViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
