import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-command-view',
  templateUrl: './command-view.component.html',
  styleUrls: ['./command-view.component.css']
})
export class CommandViewComponent implements AfterViewInit {

  @ViewChild('user') textAreaElement: ElementRef;
  @ViewChild('clone') cloneElement: ElementRef;
  blinkDiv: HTMLDivElement;
  previousCommandText = '';
  case: number;
  cases = ['clear', 'help', 'add:', 'modify:', 'delete:', 'open:', 'close'];
  commands = {
    1: 'Comandos disponibles:<br />clear<br />help<br />add:<br />modify:<br />delete:<br />open:<br />close',
    2: 'Add implementation.',
    3: 'Modify member.',
    4: 'Delete member.',
    5: 'Open member.',
    6: 'Close member.'
  }; // Respuesta a comandos

  userText: string;
  cloneText: string;
  response: {
    content: string;
    style: string;
  };

  constructor(private renderer: Renderer2) {
    this.userText = '';
    this.cloneText = '';
    this.response = {
      content: '',
      style: ''
    };
  }

  ngAfterViewInit(): void {
    this.blinkDiv = this.renderer.createElement('div');
    this.blinkDiv.className = 'blink';
    this.blinkDiv.style.visibility = 'visible';
    setInterval(() => {
      this.blinkDiv.style.visibility === 'hidden' ? this.blinkDiv.style.visibility = 'visible' : this.blinkDiv.style.visibility = 'hidden';
    }, 500);
    this.renderer.appendChild(this.cloneElement.nativeElement, this.blinkDiv);
  }

  textAreaFocus(): void {
    this.textAreaElement.nativeElement.focus();
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

  cloneToHTML(): void {
    this.cloneText = this.userText;
    this.cloneText = this.cloneText.replace(/\t/g, '&emsp;');
    this.cloneText = this.cloneText.replace(/\n/g, '<br/>');
    this.cloneElement.nativeElement.innerHTML = this.cloneText;
    this.renderer.appendChild(this.cloneElement.nativeElement, this.blinkDiv);
  }

  executeCommand(): void {
    this.response.content = '';
    this.response.style = 'margin-block-start: -1em;';
    this.response.content += '<p class="command">$ ' + this.cloneText + '</p>';
    if (typeof this.userText === 'string') {
      this.case = this.cases.indexOf(this.userText);
    }
    if (this.case === -1) {
      this.response.content += '<p class="respuesta">Comando "' + this.cloneText + '" no identificado.<br />Para ver lista de comandos, escribe: help</p>';
    } else {
      this.showResponse(this.case);
    }
    this.previousCommandText = this.userText;
    this.userText = '';
    this.cloneText = '';
    this.cloneElement.nativeElement.innerHTML = '';
    this.renderer.appendChild(this.cloneElement.nativeElement, this.blinkDiv);
  }

  loadPreviousCommand(): void {
    this.userText = this.previousCommandText;
    this.cloneToHTML();
  }

  addTabulation(): void {
    this.userText += '\t';
    this.cloneToHTML();
  }

  showResponse(caseNumber): void {
    if (this.commands[caseNumber]) {
      const x = this.commands[caseNumber];
      this.response.content += '<p class="respuesta">' + x + '</p>';
    } else {
      this.response.content = '';
      this.response.style = 'margin-block-start: 0em;';
    }
  }

}
