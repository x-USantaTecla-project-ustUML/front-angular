import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassInterfaceContextViewComponent } from './class-interface-context-view.component';

describe('ClassInterfaceContextViewComponent', () => {
  let component: ClassInterfaceContextViewComponent;
  let fixture: ComponentFixture<ClassInterfaceContextViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassInterfaceContextViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassInterfaceContextViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
