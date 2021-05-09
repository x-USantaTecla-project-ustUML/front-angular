import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandViewComponent } from './command-view.component';
import {CommandViewService} from './command-view.service';
import {Observable, of} from 'rxjs';
import {CommandResponse} from '../command-response.model';
import {FormsModule} from '@angular/forms';

class MockCommandViewService {
  constructor() {
  }
  sendCommand(command: any): Observable<CommandResponse> {
    return of({
      ustUML: 'TestUST',
      plantUML: 'TestPlant'
    });
  }
}

describe('CommandViewComponent', () => {
  let component: CommandViewComponent;
  let fixture: ComponentFixture<CommandViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandViewComponent ],
      providers: [
        { provide: CommandViewService, useValue: new MockCommandViewService() }
      ],
      imports: [FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*it('should move blink one position right', () => {
    component.input.content = '\n';
    component.onModelChange();
    expect(component.input.blinkPosition).toBe(1);
  });

  it('should move blink one position left', () => {
    component.input.content = 'a';
    component.onModelChange();
    component.input.content = '';
    component.onModelChange();
    expect(component.input.blinkPosition).toBe(0);
  });

  it('should execute command', () => {
    component.keyEvent(new KeyboardEvent('keypress', {
      code: 'Enter',
      ctrlKey: true
    }));
    expect(component.input.blinkPosition).toBe(0);
    expect(component.input.content).toBe('');
    expect(component.input.previousCommands.length).toBe(1);
  });*/
});
