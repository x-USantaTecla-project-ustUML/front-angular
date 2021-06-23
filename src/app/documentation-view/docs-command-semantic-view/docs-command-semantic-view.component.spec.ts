import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsCommandSemanticViewComponent } from './docs-command-semantic-view.component';
import {Router} from '@angular/router';

class MockRouter {
  constructor() {
  }

  navigateByUrl(url: string): void {
  }
}

describe('DocsCommandSemanticViewComponent', () => {
  let component: DocsCommandSemanticViewComponent;
  let fixture: ComponentFixture<DocsCommandSemanticViewComponent>;
  let mockRouter: MockRouter;

  beforeEach(async () => {
    mockRouter = new MockRouter();
    await TestBed.configureTestingModule({
      declarations: [ DocsCommandSemanticViewComponent ],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
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

  it('should navigateByUrl', () => {
    spyOn(mockRouter, 'navigateByUrl');
    component.navigate('mockURL');
    expect(mockRouter.navigateByUrl).toHaveBeenCalled();
  });

});
