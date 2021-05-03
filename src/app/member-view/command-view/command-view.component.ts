import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-command-view',
  templateUrl: './command-view.component.html',
  styleUrls: ['./command-view.component.css']
})
export class CommandViewComponent implements OnInit {

  @ViewChild('user') textAreaElement: ElementRef;
  previousCommand = '';
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

  blinkVisibility: string;
  userText: string;
  response: {
    content: string;
    style: string;
  };

  constructor() {
    this.userText = '';
    this.response = {
      content: '',
      style: ''
    };
    this.cursorBlink();
  }

  ngOnInit(): void {
  }

  textAreaFocus(): void {
    this.textAreaElement.nativeElement.focus();
  }

  keyEvent(e: KeyboardEvent): void {
    if (e.ctrlKey && e.code === 'Enter') {
      this.executeCommand(e);
    }else if (e.code === 'ArrowUp'){
      this.loadPreviousCommand();
    }else if (e.code === 'Enter'){
      this.addLineBreak();
    }else if (e.code === 'Tab'){
      e.preventDefault();
      this.addTabulation();
    }
  }

  executeCommand(e: KeyboardEvent): void {
    // tslint:disable-next-line:typedef
    /*$('.blink').each(function() {
      $(this).css('display', '-webkit-inline-box');
    });*/
    this.response.content = '';
    this.response.style = '{ margin-block-start: -1em; }';
    e.preventDefault();
    this.response.content += '<p class="command">$ ' + this.userText + '</p>';
    if (typeof this.userText === 'string') {
      this.case = this.cases.indexOf(this.userText);
    }
    if (this.case === -1) {
      this.response.content += '<p class="respuesta">Comando "' + this.userText + '" no identificado.<br />Para ver lista de comandos, escribe: help</p>';
    } else {
      this.showResponse(this.case);
    }
    this.previousCommand = this.userText;
    this.userText = '';
  }

  loadPreviousCommand(): void {
    // tslint:disable-next-line:typedef
    /*$('.blink').each(function() {
      $(this).css('display', 'none');
    });*/
    this.userText = this.previousCommand;
  }

  addLineBreak(): void {
    this.userText += '<br/>';
    // tslint:disable-next-line:typedef
    /*$('.blink').each(function() {
      $(this).css('display', 'none');
    });*/
  }

  addTabulation(): void {
    this.userText += '&emsp;';
    this.textAreaFocus();
  }

  showResponse(caseNumber): void {
      if (this.commands[caseNumber]) {
        const x = this.commands[caseNumber];
        this.response.content += '<p class="respuesta">' + x + '</p>';
      } else {
        this.response.content = '';
        this.response.style = '{ margin-block-start: 0em; }';
      }
  }

  cursorBlink(): void {
    this.blinkVisibility = 'visible';
    setInterval(() => {
      this.blinkVisibility === 'hidden' ? this.blinkVisibility = 'visible' : this.blinkVisibility = 'hidden';
    }, 500);
  }

}
