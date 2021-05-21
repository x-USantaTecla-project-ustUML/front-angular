import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MatDialog} from '@angular/material/dialog';
import {DemoMaterialModule} from '../../material-module';
import {AuthService} from '../../shared/auth.service';
import {LoginDialogComponent} from './login-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

class MockAuthService {
  constructor() {
  }
  isAuthenticated(): void {}
}

describe('LoginDialogComponent', () => {
  let component: LoginDialogComponent;
  let fixture: ComponentFixture<LoginDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginDialogComponent ],
      providers: [ MatDialog,
        { provide: AuthService, useValue: new MockAuthService() }],
      imports: [ DemoMaterialModule, RouterTestingModule, FormsModule, BrowserAnimationsModule ]
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
});
