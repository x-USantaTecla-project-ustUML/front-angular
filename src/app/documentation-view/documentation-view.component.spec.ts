import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationViewComponent } from './documentation-view.component';

describe('DocumentationViewComponent', () => {
  let component: DocumentationViewComponent;
  let fixture: ComponentFixture<DocumentationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentationViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
