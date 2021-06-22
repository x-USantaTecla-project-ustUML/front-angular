import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsUserAccountContextViewComponent } from './docs-user-account-context-view.component';

describe('DocsUserAccountContextViewComponent', () => {
  let component: DocsUserAccountContextViewComponent;
  let fixture: ComponentFixture<DocsUserAccountContextViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocsUserAccountContextViewComponent ]
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
});
