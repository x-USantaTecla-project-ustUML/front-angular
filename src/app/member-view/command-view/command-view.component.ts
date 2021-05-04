import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-command-view',
  templateUrl: './command-view.component.html',
  styleUrls: ['./command-view.component.css']
})
export class CommandViewComponent implements AfterViewInit {

  @ViewChild('textArea') textArea: ElementRef;
  @ViewChild('textAreaClone') textAreaClone: ElementRef;
  blink: HTMLDivElement;

  output: {
    content: string;
    style: string;
  };

  input: string;
  previousCommandText = '';

  constructor(private renderer: Renderer2) {
    this.input = '';
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
    this.updateTextAreaClone('');
  }

  updateTextAreaClone(htmlContent: string): void {
    this.textAreaClone.nativeElement.innerHTML = htmlContent;
    this.renderer.appendChild(this.textAreaClone.nativeElement, this.blink);
  }

  keyEvent(e: KeyboardEvent): void {
    if (e.ctrlKey && e.code === 'Enter') {
      e.preventDefault();
      this.executeCommand();
    }else if (e.code === 'ArrowUp'){
      e.preventDefault();
      this.loadPreviousCommand();
    }else if (e.code === 'Tab'){
      e.preventDefault();
      this.addTabulation();
    }
    $('.terminal').animate({ scrollTop: $('.terminal')[0].scrollHeight}, 10);
  }

  executeCommand(): void {
    this.showResponse();
    this.previousCommandText = this.input;
    this.input = '';
    this.updateTextAreaClone('');
  }

  parseToHTML(input: string): string {
    let parsed = input;
    parsed = parsed.replace(/\t/g, '&emsp;');
    parsed = parsed.replace(/\n/g, '<br/>');
    return parsed;
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
    if (commands[this.input]) {
      this.output.content = '<p>' + commands[this.input] + '</p>';
      this.output.style = 'margin-block-start: 2em;';
    } else if (this.input === 'clear') {
      this.output.content = '';
      this.output.style = 'margin-block-start: 0em;';
    } else {
      this.output.content = '<p>Comando "' + this.parseToHTML(this.input) + '" no identificado.<br />Para ver lista de comandos, escribe: help</p>';
      this.output.style = 'margin-block-start: 2em;';
    }
  }

  loadPreviousCommand(): void {
    this.input = this.previousCommandText;
    this.updateTextAreaClone(this.parseToHTML(this.input));
  }

  addTabulation(): void {
    this.input += '\t';
    this.updateTextAreaClone(this.parseToHTML(this.input));
  }

  textAreaFocus(): void {
    this.textArea.nativeElement.focus();
  }

}
