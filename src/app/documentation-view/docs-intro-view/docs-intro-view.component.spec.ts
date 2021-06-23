import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsIntroViewComponent } from './docs-intro-view.component';
import {Router} from '@angular/router';

class MockRouter {
  constructor() {
  }

  navigateByUrl(url: string): void {
  }
}

describe('DocsLanguageViewComponent', () => {
  let component: DocsIntroViewComponent;
  let fixture: ComponentFixture<DocsIntroViewComponent>;
  let mockRouter: MockRouter;

  beforeEach(async () => {
    mockRouter = new MockRouter();
    await TestBed.configureTestingModule({
      declarations: [ DocsIntroViewComponent ],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsIntroViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigateByUrl', () => {
    spyOn(mockRouter, 'navigateByUrl');
    component.navigate();
    expect(mockRouter.navigateByUrl).toHaveBeenCalled();
  });

});
