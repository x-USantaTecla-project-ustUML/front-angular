import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderViewComponent} from './header-view.component';
import {MatDialog} from '@angular/material/dialog';
import {DemoMaterialModule} from '../material-module';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Observable, of} from 'rxjs';
import {HttpService} from '../shared/http.service';

class MockAuthService {
  constructor() {
  }
  isAuthenticated(): boolean {
    return false;
  }
  logout(): void {
  }
}

class MockRouter {
  constructor() {
  }
  navigateByUrl(url: string): void {
  }
}

class MockHttpService {
  constructor() {
  }
  get(endpoint: string): Observable<any> {
    return of();
  }
}

describe('HeaderViewComponent', () => {
  let component: HeaderViewComponent;
  let fixture: ComponentFixture<HeaderViewComponent>;
  let mockAuthService: MockAuthService;
  let mockRouter: MockRouter;

  beforeEach(async () => {
    mockAuthService = new MockAuthService();
    mockRouter = new MockRouter();

    await TestBed.configureTestingModule({
      declarations: [ HeaderViewComponent ],
      providers: [ MatDialog,
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: HttpService, useValue: new MockHttpService() },
      ],
      imports: [ DemoMaterialModule, BrowserAnimationsModule ]
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

  it('navigate should call router and change isCollapsed to true', () => {
    spyOn(mockRouter, 'navigateByUrl');
    component.navigate('something');
    expect(mockRouter.navigateByUrl).toHaveBeenCalled();
    expect(component.isCollapsed).toBeTrue();
  });

  it('login should change isCollapsed to true', () => {
    component.login();
    expect(component.isCollapsed).toBeTrue();
  });

  it('register should change isCollapsed to true', () => {
    component.register();
    expect(component.isCollapsed).toBeTrue();
  });

  it('logout should call authService.logout and change isCollapsed to true', () => {
    spyOn(mockAuthService, 'logout');
    component.logout();
    expect(mockAuthService.logout).toHaveBeenCalled();
    expect(component.isCollapsed).toBeTrue();
  });

  it('isAuthenticated should call authService.isAuthenticated', () => {
    spyOn(mockAuthService, 'isAuthenticated');
    component.isAuthenticated();
    expect(mockAuthService.isAuthenticated).toHaveBeenCalled();
  });

});
