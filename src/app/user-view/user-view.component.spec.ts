import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserViewComponent} from './user-view.component';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';
import {UserViewService} from './user-view.service';
import {Observable, of} from 'rxjs';

class MockAuthService {
  constructor() {
  }
  isAuthenticated(): boolean {
    return true;
  }
  getEmail(): string {
    return 'prueba@gmail.com';
  }
}

class MockUserViewService {
  constructor() {
  }
  getContext(): Observable<any> {
    return of({
      ustUML: '',
      plantUML: '',
      directoryTree: ''
    });
  }
}

describe('UserViewComponent', () => {
  let component: UserViewComponent;
  let fixture: ComponentFixture<UserViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserViewComponent ],
      providers: [{ provide: AuthService, useValue: new MockAuthService() },
        { provide: UserViewService, useValue: new MockUserViewService() },
        { provide: Router, useValue: {} }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
