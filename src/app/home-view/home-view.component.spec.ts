import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeViewComponent} from './home-view.component';
import {Router} from '@angular/router';

class MockRouter {
  constructor() {
  }
  navigateByUrl(url: string): void {
  }
}

describe('HomeViewComponent', () => {
  let component: HomeViewComponent;
  let fixture: ComponentFixture<HomeViewComponent>;
  let mockRouter: MockRouter;

  beforeEach(async () => {
    mockRouter = new MockRouter();
    await TestBed.configureTestingModule({
      declarations: [ HomeViewComponent ],
      providers: [
        { provide: Router, useValue: mockRouter },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('navigate should call router', () => {
    spyOn(mockRouter, 'navigateByUrl');
    component.navigate('something');
    expect(mockRouter.navigateByUrl).toHaveBeenCalled();
  });

});
