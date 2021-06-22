import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsCommandSemanticViewComponent } from './docs-command-semantic-view.component';

describe('DocsCommandSemanticViewComponent', () => {
  let component: DocsCommandSemanticViewComponent;
  let fixture: ComponentFixture<DocsCommandSemanticViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocsCommandSemanticViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsCommandSemanticViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
