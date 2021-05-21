import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DemoMaterialModule} from '../../material-module';
import {AuthService} from '../../shared/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterDialogComponent} from './register-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpService } from '../../shared/http.service';
import {Observable, of} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

class MockAuthService {
  constructor() {
  }
  isAuthenticated(): void {}
}

class MockHttpService {
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

describe('RegisterDialogComponent', () => {
  let component: RegisterDialogComponent;
  let fixture: ComponentFixture<RegisterDialogComponent>;
  const routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterDialogComponent ],
      providers: [ MatDialog,
        { provide: AuthService, useValue: new MockAuthService() },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: Router, useValue: routerSpy },
        { provide: HttpService, useValue: new MockHttpService() }],
      imports: [ DemoMaterialModule, FormsModule, BrowserAnimationsModule, HttpClientTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('given email and password when register then redirect if successful', () => {
    component.register();
    expect (routerSpy.navigate).toHaveBeenCalledWith([ 'user-view' ]);
  });
});
