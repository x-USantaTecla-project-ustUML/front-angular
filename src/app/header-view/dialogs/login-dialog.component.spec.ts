import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MatDialog} from '@angular/material/dialog';
import {DemoMaterialModule} from '../../material-module';
import {AuthService} from '../../shared/auth.service';
import {LoginDialogComponent} from './login-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';

class MockAuthService {
  constructor() {
  }
  login(email, password): Observable<any> {
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

describe('LoginDialogComponent', () => {
  let component: LoginDialogComponent;
  let fixture: ComponentFixture<LoginDialogComponent>;
  const routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginDialogComponent ],
      providers: [ MatDialog,
        { provide: AuthService, useValue: new MockAuthService() },
        { provide: Router, useValue: routerSpy }],
      imports: [ DemoMaterialModule, FormsModule, BrowserAnimationsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('given email and password when login then redirect if successful', () => {
    component.login();
    expect (routerSpy.navigate).toHaveBeenCalledWith([ 'user-view' ]);
  });
});
