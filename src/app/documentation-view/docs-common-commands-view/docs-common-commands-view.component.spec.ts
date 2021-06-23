import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsCommonCommandsViewComponent } from './docs-common-commands-view.component';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

class MockMatSnackBar {
  constructor() {
  }

  open(message: string, action: string, config?: MatSnackBarConfig): void {
  }
}

describe('DocsCommonCommandsViewComponent', () => {
  let component: DocsCommonCommandsViewComponent;
  let fixture: ComponentFixture<DocsCommonCommandsViewComponent>;
  let snackBarMock: MockMatSnackBar;

  beforeEach(async () => {
    snackBarMock = new MockMatSnackBar();
    await TestBed.configureTestingModule({
      declarations: [ DocsCommonCommandsViewComponent ],
      providers: [
        { provide: MatSnackBar, useValue: snackBarMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsCommonCommandsViewComponent);
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
