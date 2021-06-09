import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandedImageComponent } from './expanded-image.component';

describe('ExpandedImageComponent', () => {
  let component: ExpandedImageComponent;
  let fixture: ComponentFixture<ExpandedImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpandedImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandedImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
