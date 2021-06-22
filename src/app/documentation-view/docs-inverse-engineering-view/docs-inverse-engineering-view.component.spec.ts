import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsInverseEngineeringViewComponent } from './docs-inverse-engineering-view.component';

describe('DocsInverseEngineeringViewComponent', () => {
  let component: DocsInverseEngineeringViewComponent;
  let fixture: ComponentFixture<DocsInverseEngineeringViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocsInverseEngineeringViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsInverseEngineeringViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
