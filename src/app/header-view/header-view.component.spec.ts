import {HeaderViewComponent} from './header-view.component';

class MockAuthService {
  constructor() {
  }
  isAuthenticated(): boolean {
    return false;
  }
}

describe('HeaderViewComponent', () => {
  /*let component: HeaderViewComponent;
  let fixture: ComponentFixture<HeaderViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderViewComponent ],
      providers: [ MatDialog,
        { provide: AuthService, useValue: new MockAuthService() }],
      imports: [ DemoMaterialModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
