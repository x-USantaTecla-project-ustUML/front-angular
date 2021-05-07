import {AfterViewInit, Component, ElementRef, EventEmitter, Output, Renderer2, ViewChild} from '@angular/core';
import * as yaml from 'js-yaml';
import {CommandViewService} from './command-view.service';
import {CommandResponse} from '../command-response.model';

@Component({
  selector: 'app-command-view',
  templateUrl: './command-view.component.html',
  styleUrls: ['./command-view.component.css']
})
export class CommandViewComponent implements AfterViewInit {

  @Output() serverResponse = new EventEmitter<CommandResponse>();

  @ViewChild('textArea') textArea: ElementRef;
  @ViewChild('textAreaClone') textAreaClone: ElementRef;
  @ViewChild('terminal') terminal: ElementRef;
  blink: HTMLDivElement;

  input: {
    content: string;
    previousCommands: string[];
    selectedCommand: number;
    blinkPosition: number;
  };

  output: {
    content: string;
    style: string;
  };

  constructor(private renderer: Renderer2, private userViewService: CommandViewService) {
    this.input = {
      content: '',
      previousCommands: [],
      selectedCommand: 0,
      blinkPosition: 0
    };
    this.output = {
      content: '',
      style: ''
    };
  }

  ngAfterViewInit(): void {
    this.blink = this.renderer.createElement('div');
    this.blink.className = 'blink';
    this.blink.style.visibility = 'visible';
    setInterval(() => {
      this.blink.style.visibility === 'hidden' ? this.blink.style.visibility = 'visible' : this.blink.style.visibility = 'hidden';
    }, 500);
    this.updateTextAreaClone();
  }

  private updateTextAreaClone(): void {
    const text = this.input.content;
    const beginning = this.parseToHTML(text.substr(0, this.input.blinkPosition));
    const end = this.parseToHTML(text.substr(this.input.blinkPosition, text.length - this.input.blinkPosition));

    this.textAreaClone.nativeElement.innerHTML = '';

    this.textAreaClone.nativeElement.insertAdjacentHTML( 'beforeend', beginning );
    this.renderer.appendChild(this.textAreaClone.nativeElement, this.blink);
    this.textAreaClone.nativeElement.insertAdjacentHTML( 'beforeend', end );
  }

  onModelChange(): void {
    const newPosition = this.input.blinkPosition + Math.sign(this.input.content.length - this.input.blinkPosition);
    this.modifyBlink(newPosition);
  }

  private modifyBlink(newPosition: number): void {
    if (newPosition >= 0 && newPosition <= this.input.content.length) {
      this.input.blinkPosition = newPosition;
      this.updateTextAreaClone();
    }
  }

  keyEvent(e: KeyboardEvent): void {
    const keyMap = {
      Enter: (event) => {
        if (event.ctrlKey) {
          event.preventDefault();
          this.executeCommand();
          this.modifyBlink(0);
        }
      },
      ArrowUp: (event) => {
        event.preventDefault();
        this.loadPastCommand(this.input.selectedCommand - 1);
        this.modifyBlink(this.input.content.length);
      },
      ArrowDown: (event) => {
        event.preventDefault();
        this.loadPastCommand(this.input.selectedCommand + 1);
        this.modifyBlink(this.input.content.length);
      },
      ArrowLeft: (event) => {
        this.modifyBlink(this.input.blinkPosition - 1);
      },
      ArrowRight: (event) => {
        this.modifyBlink(this.input.blinkPosition + 1);
      },
      Tab: (event) => {
        event.preventDefault();
        const text = this.input.content;
        this.input.content = [text.slice(0, this.input.blinkPosition), text.slice(this.input.blinkPosition)].join('  ');
        this.modifyBlink(this.input.blinkPosition + 2);
        setTimeout(() => this.textArea.nativeElement.setSelectionRange(this.input.blinkPosition, this.input.blinkPosition), 15);
      }
    };
    if (keyMap[e.code]) {
      keyMap[e.code](e);
    }
    this.terminal.nativeElement.scrollTop = this.terminal.nativeElement.scrollHeight;
  }

  private executeCommand(): void {
    this.input.previousCommands.push(this.input.content);
    this.input.selectedCommand = this.input.previousCommands.length;
    this.showResponse();
    this.input.content = '';
  }

  private showResponse(): void {
    const commands = {
      help: 'Available commands:<br />clear<br />help<br />add:<br />modify:<br />delete:<br />open:<br />close',
      'add:': 'Added successfully.',
      'modify:': 'Modified successfully.',
      'delete:': 'Deleted successfully.',
      'open:': 'Opened successfully.',
      close: 'Closed successfully.'
    };
    const command = this.input.content.split('\n')[0];
    if (commands[command]) {
      if (command === 'help' || command === 'clear'){
        this.output.content = '<p>' + commands[command] + '</p>';
        this.output.style = 'margin-block-start: 2em;';
      } else {
        this.sendCommandToServer(commands[command]);
      }
    } else if (command === 'clear') {
      this.output.content = '';
      this.output.style = 'margin-block-start: 0em;';
    } else {
      this.output.content = '<p>Command "' + this.parseToHTML(this.input.content) + '" not identified.<br />To see command\'s list, write: help</p>';
    }
  }

  private parseToHTML(input: string): string {
    let parsed = input;
    parsed = parsed.replace(/\n/g, '<br/>');
    parsed = parsed.replace(/ /g, '&nbsp;');
    return parsed;
  }

  private loadPastCommand(pastCommand: number): void {
    if (pastCommand >= 0 && pastCommand < this.input.previousCommands.length){
      this.input.content = this.input.previousCommands[pastCommand];
      this.input.selectedCommand = pastCommand;
    }
  }

  textAreaFocus(): void {
    this.textArea.nativeElement.focus();
  }

}
