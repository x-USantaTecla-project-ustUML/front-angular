import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsDirectEngineeringViewComponent } from './docs-direct-engineering-view.component';
import {Router} from '@angular/router';

class MockRouter {
  constructor() {
  }

  navigateByUrl(url: string): void {
  }
}

describe('DocsDirectEngineeringViewComponent', () => {
  let component: DocsDirectEngineeringViewComponent;
  let fixture: ComponentFixture<DocsDirectEngineeringViewComponent>;
  let mockRouter: MockRouter;

  beforeEach(async () => {
    mockRouter = new MockRouter();
    await TestBed.configureTestingModule({
      declarations: [ DocsDirectEngineeringViewComponent ],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsDirectEngineeringViewComponent);
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
