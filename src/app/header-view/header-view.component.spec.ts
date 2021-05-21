import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderViewComponent} from './header-view.component';
import {MatDialog} from '@angular/material/dialog';
import {DemoMaterialModule} from '../material-module';
import {AuthService} from '../shared/auth.service';

class MockAuthService {
  constructor() {
  }
  isAuthenticated(): void {}
  getToken(): void {}
}

describe('HeaderViewComponent', () => {
  let component: HeaderViewComponent;
  let fixture: ComponentFixture<HeaderViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderViewComponent ],
      providers: [ MatDialog,
        { provide: AuthService, useValue: new MockAuthService() }],
      imports: [ DemoMaterialModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
