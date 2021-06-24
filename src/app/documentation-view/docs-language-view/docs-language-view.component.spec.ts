import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DocsLanguageViewComponent} from './docs-language-view.component';
import {Router} from '@angular/router';

class MockRouter {
  constructor() {
  }

  navigateByUrl(url: string): void {
  }
}

describe('DocsIntroductionViewComponent', () => {
  let component: DocsLanguageViewComponent;
  let fixture: ComponentFixture<DocsLanguageViewComponent>;
  let mockRouter: MockRouter;

  beforeEach(async () => {
    mockRouter = new MockRouter();
    await TestBed.configureTestingModule({
      declarations: [ DocsLanguageViewComponent ],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsLanguageViewComponent);
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
