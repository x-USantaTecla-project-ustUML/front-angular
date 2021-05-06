import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import * as yaml from 'js-yaml';
import {UserViewService} from '../user-view.service';
import {CommandResponse} from '../command-response.model';

@Component({
  selector: 'app-command-view',
  templateUrl: './command-view.component.html',
  styleUrls: ['./command-view.component.css']
})
export class CommandViewComponent implements AfterViewInit {

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

  constructor(private renderer: Renderer2, private userViewService: UserViewService) {
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
    if (e.ctrlKey && e.code === 'Enter') {
      e.preventDefault();
      this.executeCommand();
      this.modifyBlink(0);
    } else if (e.code === 'ArrowUp'){
      e.preventDefault();
      this.loadPastCommand(this.input.selectedCommand - 1);
      this.modifyBlink(this.input.content.length);
      this.textArea.nativeElement.setSelectionRange(this.input.content.length, this.input.content.length);
    } else if (e.code === 'ArrowDown'){
      e.preventDefault();
      this.loadPastCommand(this.input.selectedCommand + 1);
      this.modifyBlink(this.input.content.length);
      this.textArea.nativeElement.setSelectionRange(this.input.content.length, this.input.content.length);
    } else if (e.code === 'ArrowLeft'){
      this.modifyBlink(this.input.blinkPosition - 1);
    } else if (e.code === 'ArrowRight'){
      this.modifyBlink(this.input.blinkPosition + 1);
    } else if (e.code === 'Tab'){
      e.preventDefault();
      const text = this.input.content;
      this.input.content = [text.slice(0, this.input.blinkPosition), text.slice(this.input.blinkPosition)].join('  ');
      this.modifyBlink(this.input.blinkPosition + 2);
      setTimeout(() => this.textArea.nativeElement.setSelectionRange(this.input.blinkPosition, this.input.blinkPosition), 15);
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
      help: 'Comandos disponibles:<br />clear<br />help<br />add:<br />modify:<br />delete:<br />open:<br />close',
      'add:': 'Add implementation.',
      'modify:': 'Modify member.',
      'delete:': 'Delete member.',
      'open:': 'Open member.',
      close: 'Close member.'
    };
    const command = this.input.content.split('\n')[0];
    if (commands[command]) {
      if (command === 'help'){
        this.output.content = '<p>' + commands[command] + '</p>';
        this.output.style = 'margin-block-start: 2em;';
      } else {
        try {
          const commandObject = yaml.load(this.input.content, { schema: yaml.JSON_SCHEMA });
          this.userViewService.create(commandObject)
            .subscribe((response) => { this.serverResponse.emit(response); });
        } catch (e) {
          console.log(e);
        }
      }
    } else if (command === 'clear') {
      this.output.content = '';
      this.output.style = 'margin-block-start: 0em;';
    } else {
      this.output.content = '<p>Comando "' + this.parseToHTML(this.input.content) + '" no identificado.<br />Para ver lista de comandos, escribe: help</p>';
      this.output.style = 'margin-block-start: 2em;';
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
