import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserViewComponent} from './user-view.component';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';

class MockAuthService {
  constructor() {
  }
  isAuthenticated(): boolean {
    return true;
  }
}

describe('UserViewComponent', () => {
  let component: UserViewComponent;
  let fixture: ComponentFixture<UserViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserViewComponent ],
      providers: [{ provide: AuthService, useValue: new MockAuthService() },
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
