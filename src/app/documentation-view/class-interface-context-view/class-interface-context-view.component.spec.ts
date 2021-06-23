import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassInterfaceContextViewComponent } from './class-interface-context-view.component';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

class MockMatSnackBar {
  constructor() {
  }

  open(message: string, action: string, config?: MatSnackBarConfig): void {
  }
}

describe('ClassInterfaceContextViewComponent', () => {
  let component: ClassInterfaceContextViewComponent;
  let fixture: ComponentFixture<ClassInterfaceContextViewComponent>;
  let snackBarMock: MockMatSnackBar;

  beforeEach(async () => {
    snackBarMock = new MockMatSnackBar();
    await TestBed.configureTestingModule({
      declarations: [ ClassInterfaceContextViewComponent ],
      providers: [
        { provide: MatSnackBar, useValue: snackBarMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassInterfaceContextViewComponent);
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
