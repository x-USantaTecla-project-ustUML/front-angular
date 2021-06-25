import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RepositoryViewComponent} from './repository-view.component';

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
    component.directoryTree = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    component.activeMemberID = null;
    expect(component).toBeTruthy();
  });

  it('given directoryTree and selectedNodeId when it changes then set icons and paint', () => {
    const directoryTree = JSON.parse('[' + '{"id": "a", "name": "a", "children": [{"id": "60d58c2f9f1f522e72062dd0", ' +
      '"name": "newProject"}]}' + ']');
    const activeMemberID = 'a';
    component.directoryTree = directoryTree;
    component.activeMemberID = activeMemberID;
    component.ngOnChanges();
    expect(component.dataSource.data).toEqual(directoryTree);
  });

});
