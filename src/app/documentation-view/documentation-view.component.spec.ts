import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationViewComponent } from './documentation-view.component';

class MockDrawer {
  constructor() {
  }

  toggle(): void {
  }
}

describe('DocumentationViewComponent', () => {
  let component: DocumentationViewComponent;
  let fixture: ComponentFixture<DocumentationViewComponent>;
  let mockDrawer: MockDrawer;

  beforeEach(async () => {
    mockDrawer = new MockDrawer();
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

  it('should change text when expand drawer', () => {
    component.text = 'close';
    spyOn(mockDrawer, 'toggle');
    component.expand(mockDrawer);
    expect(component.text).toBe('menu');
    expect(mockDrawer.toggle).toHaveBeenCalled();
  });

  it('should change text when expand drawer 2', () => {
    component.mode = 'something';
    component.text = 'something';
    spyOn(mockDrawer, 'toggle');
    component.expand(mockDrawer);
    expect(component.text).toBe('close');
    expect(mockDrawer.toggle).toHaveBeenCalled();
  });

});
