import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';

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
  };

  output: {
    content: string;
    style: string;
  };

  constructor(private renderer: Renderer2) {
    this.input = {
      content: '',
      previousCommands: [],
      selectedCommand: 0
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
    }else if (e.code === 'ArrowDown'){
      e.preventDefault();
      this.loadNextCommand();
    }else if (e.code === 'Tab'){
      e.preventDefault();
      this.addTabulation();
    }
    this.terminal.nativeElement.scrollTop = this.terminal.nativeElement.scrollHeight;
  }

  private executeCommand(): void {
    this.showResponse();
    this.input.previousCommands.push(this.input.content);
    this.input.selectedCommand = this.input.previousCommands.length;
    this.input.content = '';
    this.updateTextAreaClone('');
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
    if (commands[this.input.content]) {
      this.output.content = '<p>' + commands[this.input.content] + '</p>';
      this.output.style = 'margin-block-start: 2em;';
    } else if (this.input.content === 'clear') {
      this.output.content = '';
      this.output.style = 'margin-block-start: 0em;';
    } else {
      this.output.content = '<p>Comando "' + this.parseToHTML(this.input.content) + '" no identificado.<br />Para ver lista de comandos, escribe: help</p>';
      this.output.style = 'margin-block-start: 2em;';
    }
  }

  parseToHTML(input: string): string {
    let parsed = input;
    parsed = parsed.replace(/\t/g, '&emsp;');
    parsed = parsed.replace(/\n/g, '<br/>');
    return parsed;
  }


  private loadPreviousCommand(): void {
    if (this.input.selectedCommand > 0){
      this.input.selectedCommand--;
      this.input.content = this.input.previousCommands[this.input.selectedCommand];
      this.updateTextAreaClone(this.parseToHTML(this.input.content));
    }
  }

  private loadNextCommand(): void {
    if (this.input.selectedCommand < this.input.previousCommands.length - 1){
      this.input.selectedCommand++;
      this.input.content = this.input.previousCommands[this.input.selectedCommand];
      this.updateTextAreaClone(this.parseToHTML(this.input.content));
    }
  }

  private addTabulation(): void {
    this.input.content += '\t';
    this.updateTextAreaClone(this.parseToHTML(this.input.content));
  }

  textAreaFocus(): void {
    this.textArea.nativeElement.focus();
  }

}
