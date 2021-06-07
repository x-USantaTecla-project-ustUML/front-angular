import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsIntroductionViewComponent } from './docs-introduction-view.component';

describe('DocsIntroductionViewComponent', () => {
  let component: DocsIntroductionViewComponent;
  let fixture: ComponentFixture<DocsIntroductionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocsIntroductionViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsIntroductionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
