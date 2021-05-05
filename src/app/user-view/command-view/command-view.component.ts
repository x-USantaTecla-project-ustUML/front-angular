import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import * as yaml from 'js-yaml';

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
    previousContentLength: number;
    previousCommands: string[];
    selectedCommand: number;
    cursorPosition: number;
  };

  output: {
    content: string;
    style: string;
  };

  constructor(private renderer: Renderer2) {
    this.input = {
      content: '',
      previousContentLength: 0,
      previousCommands: [],
      selectedCommand: 0,
      cursorPosition: 0
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

  updateTextAreaClone(): void {
    const sign = Math.sign(this.input.content.length - this.input.previousContentLength);
    this.input.cursorPosition += sign;
    this.insertAtStringPos(this.textAreaClone.nativeElement, this.input.cursorPosition, this.blink);
  }

  private insertAtStringPos(el: HTMLDivElement, pos: number, insertable: HTMLDivElement): void {
    const text = this.input.content;
    const beginning = this.parseToHTML(text.substr(0, pos));
    const end = this.parseToHTML(text.substr(pos, text.length - pos));

    el.innerHTML = '';

    el.insertAdjacentHTML( 'beforeend', beginning );
    this.renderer.appendChild(el, insertable);
    el.insertAdjacentHTML( 'beforeend', end );

  }

  keyEvent(e: KeyboardEvent): void {
    if (e.ctrlKey && e.code === 'Enter') {
      e.preventDefault();
      this.executeCommand();
    }else if (e.code === 'ArrowUp'){
      e.preventDefault();
      this.loadPreviousCommand();
    }else if (e.code === 'ArrowDown'){
      e.preventDefault();
      this.loadNextCommand();
    }else if (e.code === 'ArrowLeft'){
      if (this.input.cursorPosition > 0) {
        this.input.cursorPosition--;
        this.updateTextAreaClone();
      }
    }else if (e.code === 'ArrowRight'){
      if (this.input.cursorPosition < this.input.content.length) {
        this.input.cursorPosition++;
        this.updateTextAreaClone();
      }
    }else if (e.code === 'Tab'){
      e.preventDefault();
      this.addTabulation();
    }
    this.terminal.nativeElement.scrollTop = this.terminal.nativeElement.scrollHeight;
  }

  private executeCommand(): void {
    this.input.previousCommands.push(this.input.content);
    this.input.selectedCommand = this.input.previousCommands.length;
    this.showResponse();
    this.input.content = '';
    this.input.cursorPosition = 0;
    this.input.previousContentLength = 0;
    this.updateTextAreaClone();
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
        // TODO Llamar a Command Service (parse YAML to JSON dentro + post + observable)
        console.log(yaml.load(this.input.content, { schema: yaml.JSON_SCHEMA })); // Try catch
        console.log(JSON.stringify(yaml.load(this.input.content)));
      }
    } else if (command === 'clear') {
      this.output.content = '';
      this.output.style = 'margin-block-start: 0em;';
    } else {
      this.output.content = '<p>Comando "' + this.parseToHTML(command) + '" no identificado.<br />Para ver lista de comandos, escribe: help</p>';
      this.output.style = 'margin-block-start: 2em;';
    }
  }

  parseToHTML(input: string): string {
    let parsed = input;
    parsed = parsed.replace(/\n/g, '<br/>');
    parsed = parsed.replace(/ /g, '&nbsp;');
    return parsed;
  }


  private loadPreviousCommand(): void {
    if (this.input.selectedCommand > 0){
      this.input.selectedCommand--;
      this.input.content = this.input.previousCommands[this.input.selectedCommand];
      this.input.previousContentLength = this.input.content.length;
      this.input.cursorPosition = this.input.content.length;
      this.updateTextAreaClone();
    }
  }

  private loadNextCommand(): void {
    if (this.input.selectedCommand < this.input.previousCommands.length - 1){
      this.input.selectedCommand++;
      this.input.content = this.input.previousCommands[this.input.selectedCommand];
      this.input.previousContentLength = this.input.content.length;
      this.input.cursorPosition = this.input.content.length;
      this.updateTextAreaClone();
    }
  }

  private addTabulation(): void {
    this.input.content += '  ';
    this.input.previousContentLength = this.input.content.length;
    this.input.cursorPosition = this.input.content.length;
    this.updateTextAreaClone();
  }

  textAreaFocus(): void {
    this.textArea.nativeElement.focus();
  }

}
