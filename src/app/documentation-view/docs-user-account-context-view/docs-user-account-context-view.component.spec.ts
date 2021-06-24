import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DocsUserAccountContextViewComponent} from './docs-user-account-context-view.component';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

class MockMatSnackBar {
  constructor() {
  }

  open(message: string, action: string, config?: MatSnackBarConfig): void {
  }
}

describe('DocsUserAccountContextViewComponent', () => {
  let component: DocsUserAccountContextViewComponent;
  let fixture: ComponentFixture<DocsUserAccountContextViewComponent>;
  let snackBarMock: MockMatSnackBar;

  beforeEach(async () => {
    snackBarMock = new MockMatSnackBar();
    await TestBed.configureTestingModule({
      declarations: [ DocsUserAccountContextViewComponent ],
      providers: [
        { provide: MatSnackBar, useValue: snackBarMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsUserAccountContextViewComponent);
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
