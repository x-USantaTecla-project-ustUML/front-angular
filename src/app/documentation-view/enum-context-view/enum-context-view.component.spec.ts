import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EnumContextViewComponent} from './enum-context-view.component';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

class MockMatSnackBar {
  constructor() {
  }

  open(message: string, action: string, config?: MatSnackBarConfig): void {
  }
}

describe('EnumContextViewComponent', () => {
  let component: EnumContextViewComponent;
  let fixture: ComponentFixture<EnumContextViewComponent>;
  let snackBarMock: MockMatSnackBar;

  beforeEach(async () => {
    snackBarMock = new MockMatSnackBar();
    await TestBed.configureTestingModule({
      declarations: [ EnumContextViewComponent ],
      providers: [
        { provide: MatSnackBar, useValue: snackBarMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnumContextViewComponent);
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
