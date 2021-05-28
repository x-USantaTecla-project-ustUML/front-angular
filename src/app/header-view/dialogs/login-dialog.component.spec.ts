import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MatDialog} from '@angular/material/dialog';
import {DemoMaterialModule} from '../../material-module';
import {AuthService} from '../../shared/auth.service';
import {LoginDialogComponent} from './login-dialog.component';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';

class MockAuthService {
  constructor() {
  }
  login(email, password): Observable<any> {
    return of({});
  }
}

describe('LoginDialogComponent', () => {
  let component: LoginDialogComponent;
  let fixture: ComponentFixture<LoginDialogComponent>;
  let routerSpy: any;

  beforeEach(() => {
    routerSpy = {navigate: jasmine.createSpy('navigate')};
    TestBed.configureTestingModule({
      declarations: [ LoginDialogComponent ],
      providers: [ MatDialog,
        { provide: AuthService, useValue: new MockAuthService() },
        { provide: Router, useValue: routerSpy }],
      imports: [ DemoMaterialModule, FormsModule, BrowserAnimationsModule ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(LoginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
