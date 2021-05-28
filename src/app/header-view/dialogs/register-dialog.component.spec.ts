import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DemoMaterialModule} from '../../material-module';
import {AuthService} from '../../shared/auth.service';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterDialogComponent} from './register-dialog.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpService} from '../../shared/http.service';
import {Observable, of} from 'rxjs';
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
    return of({});
  }
}

describe('RegisterDialogComponent', () => {
  let component: RegisterDialogComponent;
  let fixture: ComponentFixture<RegisterDialogComponent>;
  let routerSpy: any;

  beforeEach(() => {
    routerSpy = {navigate: jasmine.createSpy('navigate')};
    TestBed.configureTestingModule({
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
    fixture = TestBed.createComponent(RegisterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
