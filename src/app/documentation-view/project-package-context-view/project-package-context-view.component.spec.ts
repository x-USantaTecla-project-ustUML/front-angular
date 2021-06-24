import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectPackageContextViewComponent} from './project-package-context-view.component';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

class MockMatSnackBar {
  constructor() {
  }

  open(message: string, action: string, config?: MatSnackBarConfig): void {
  }
}

describe('ProjectPackageContextViewComponent', () => {
  let component: ProjectPackageContextViewComponent;
  let fixture: ComponentFixture<ProjectPackageContextViewComponent>;
  let snackBarMock: MockMatSnackBar;

  beforeEach(async () => {
    snackBarMock = new MockMatSnackBar();
    await TestBed.configureTestingModule({
      declarations: [ ProjectPackageContextViewComponent ],
      providers: [
        { provide: MatSnackBar, useValue: snackBarMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPackageContextViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open snackbar', () => {
    spyOn(snackBarMock, 'open');
    component.openSnackBar();
    expect(snackBarMock.open).toHaveBeenCalled();
  });

});
