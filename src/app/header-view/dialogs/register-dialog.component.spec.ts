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

class MockAuthService {
  constructor() {
  }
  isAuthenticated(): void {}
}

describe('RegisterDialogComponent', () => {
  let component: RegisterDialogComponent;
  let fixture: ComponentFixture<RegisterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterDialogComponent ],
      providers: [ MatDialog,
        { provide: AuthService, useValue: new MockAuthService() },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: HttpService, useValue: {} }],
      imports: [ DemoMaterialModule, RouterTestingModule, FormsModule, BrowserAnimationsModule, HttpClientTestingModule ]
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
});
