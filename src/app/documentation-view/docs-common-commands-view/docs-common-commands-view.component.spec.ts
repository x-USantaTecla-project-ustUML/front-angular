import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsCommonCommandsViewComponent } from './docs-common-commands-view.component';

describe('DocsCommonCommandsViewComponent', () => {
  let component: DocsCommonCommandsViewComponent;
  let fixture: ComponentFixture<DocsCommonCommandsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocsCommonCommandsViewComponent ]
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
});
