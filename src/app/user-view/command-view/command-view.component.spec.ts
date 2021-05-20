import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CommandViewComponent} from './command-view.component';
import {CommandViewService} from './command-view.service';
import {Observable, of} from 'rxjs';
import {CommandResponse} from '../command-response.model';
import {FormsModule} from '@angular/forms';
import {MonacoEditorModule} from 'ngx-monaco-editor';

class MockCommandViewService {
  constructor() {
  }
  sendCommand(command: any): Observable<CommandResponse> {
    return of({
      ustUML: '',
      plantUML: ''
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
      imports: [FormsModule, MonacoEditorModule.forRoot()]
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

  it('given console with help command when executeCommand then return correct response', () => {
    component.input.content = 'help';
    pressKey('Enter');
    expect(component.output.content).toBe('<p>Available commands:<br/> \'clear\' \'help\' \'add:\' \'modify:\' \'delete:\' \'open:\' \'close\'</p>');
  });

  function pressKey(code: string): void {
    component.keyEvent(new KeyboardEvent('keypress', {
      code,
      ctrlKey: true
    }));
  }

  it('given console with clear command when executeCommand then return correct response', () => {
    component.input.content = 'clear';
    pressKey('Enter');
    expect(component.output.content).toBe('');
  });

  it('given console with command when executeCommand then add previous command', () => {
    const input = 'add:\r\n' +
      '\tmembers:\r\n' +
      '\t\tmember:\r\n' +
      '\terror';
    component.input.content = input;
    pressKey('Enter');
    expect(component.input.previousCommands.length).toBe(1);
    expect(component.input.previousCommands[0]).toBe(input + '\n');
  });

  it('given console with command when executeCommand then press arrowUp to load previous command', () => {
    const input = 'add:\r\n' +
      '\tmembers:\r\n' +
      '\t\tmember:\r\n' +
      '\terror';
    component.input.content = input;
    pressKey('Enter');
    pressKey('ArrowUp');
    expect(component.input.content).toBe(input + '\n');
  });

  it('given console with command when executeCommand two times then add two previous commands', () => {
    let input = 'add';
    for (let i = 0; i < 2; i++) {
      component.input.content = input;
      pressKey('Enter');
      input = input.substring(0, input.length - 1);
    }
    expect(component.input.previousCommands.length).toBe(2);
    expect(component.input.previousCommands[0]).toBe('add\n');
  });

  it('given console with command when executeCommand two times then press two times arrowUp and one time arrowDown', () => {
    let input = 'add';
    for (let i = 0; i < 2; i++) {
      component.input.content = input;
      pressKey('Enter');
      input = input.substring(0, input.length - 1);
    }
    for (let i = 0; i < 2; i++) {
      pressKey('ArrowUp');
    }
    pressKey('ArrowDown');
    expect(component.input.content).toBe('ad\n');
  });

  it('given console with command when executeCommand then call service and return executing', () => {
    component.input.content = 'add:\r\n' +
      '\tmembers:\r\n' +
      '\t\t- class: Name';
    pressKey('Enter');
    expect(component.output.content).toBe('<p>' + 'Executing...' + '</p>');
  });

  it('given console with bad command when executeCommand then show error', () => {
    component.input.content = 'asfddfs';
    pressKey('Enter');
    expect(component.output.content).toBe('<p>Command "asfddfs" not identified.<br/>To see command\'s list, write: help</p>');
  });

  it('given console with bad yaml command when executeCommand then show error', () => {
    component.input.content = 'add:\r\ncommand';
    pressKey('Enter');
    expect(component.output.content).toBe('<p>YAMLException: Yaml syntax is not correct.</p>');
  });

});
