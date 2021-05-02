import {Component, HostListener, OnInit} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-command-view',
  templateUrl: './command-view.component.html',
  styleUrls: ['./command-view.component.css']
})
export class CommandViewComponent implements OnInit {

  previousCommand = '';
  declare case;
  cases = ['clear', 'help', 'resumen', 'cv', 'portafolio', 'contacto'];
  commands = {
    1: 'Comandos disponibles:<br />clear<br />help<br />resumen<br />cv<br />portafolio<br />contacto',
    2: 'Muestra Resumen.',
    3: 'Muestra CV.',
    4: 'Muestra Portafolio.',
    5: 'Muestra Contacto.'
  }; // Respuesta a comandos

  constructor() {  }

  ngOnInit(): void {
    this.loadTerminal();
    this.cursorBlink();
  }

  focus(): void { $('#user').focus(); }

  loadTerminal(): void {
    $('.terminal').show();
    // tslint:disable-next-line:only-arrow-functions typedef
    $('#user').on('input', function(e){
      $('.clone').text((document.getElementById('user') as HTMLInputElement).value);
    });
  }

  @HostListener('document:keyup', ['$event'])
  // tslint:disable-next-line:typedef
  keyEvent(e: KeyboardEvent){
    if (e.keyCode === 13) {
      // tslint:disable-next-line:typedef
      $('.blink').each(function() {
        $(this).css('display', '-webkit-inline-box');
      });
      document.getElementById('respuesta').innerHTML = '';
      // @ts-ignore
      document.getElementById('respuesta').style = 'margin-block-start: -1em;';
      e.preventDefault();
      const valor = document.getElementsByClassName('clone')[0].innerHTML.valueOf();
      $(this).val('');
      $('.clone').text('');
      $('#respuesta').append('<p class="command">$ ' + valor + '</p>');
      let valorCase;
      if (this.previousCommand === ''){
        valorCase = valor.replace(' ', '').substring(0, valor.length - 2);
      } else{
        valorCase = valor.replace(' ', '').substring(0, valor.length - 1);
      }
      if (typeof valorCase === 'string') {
        this.case = this.cases.indexOf(valorCase);
      }
      if (this.case === -1) {
        $('#respuesta').append('<p class="respuesta">Comando "' + valor + '" no identificado.<br />Para ver lista de comandos, escribe: help</p>');
      } else {
        this.terminal(this.case);
      }
      this.previousCommand = (document.getElementById('user') as HTMLInputElement).value;
      (document.getElementById('user') as HTMLInputElement).value = '';
    }else if (e.keyCode === 38){
      $('.clone').text(this.previousCommand);
      (document.getElementById('user') as HTMLInputElement).value = this.previousCommand;
    }else if (e.keyCode === 17){
      (document.getElementById('user') as HTMLInputElement).value += '\n';
      // tslint:disable-next-line:typedef
      $('.blink').each(function() {
        $(this).css('display', 'none');
      });
    }
  }

  terminal(caseNumber): void {
      if (this.commands[caseNumber]) {
        const x = this.commands[caseNumber];
        $('#respuesta').append('<p class="respuesta">' + x + '</p>');
      } else {
        $('#respuesta, .info').empty();
        // @ts-ignore
        document.getElementById('respuesta').style = 'margin-block-start: 0em;';
      }
  }

  cursorBlink(): void {
    // tslint:disable-next-line:typedef
    $('.blink').each(function() {
      const elem = $(this);
      // tslint:disable-next-line:only-arrow-functions typedef
      setInterval(function() {
        if (elem.css('visibility') === 'hidden') {
          elem.css('visibility', 'visible');
        } else {
          elem.css('visibility', 'hidden');
        }
      }, 500);
    });
  }

}
