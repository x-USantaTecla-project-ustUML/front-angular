import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryViewComponent } from './repository-view.component';

describe('RepositoryViewComponent', () => {
  let component: RepositoryViewComponent;
  let fixture: ComponentFixture<RepositoryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepositoryViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
