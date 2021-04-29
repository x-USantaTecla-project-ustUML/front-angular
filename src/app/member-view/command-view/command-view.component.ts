import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-command-view',
  templateUrl: './command-view.component.html',
  styleUrls: ['./command-view.component.css']
})
export class CommandViewComponent implements OnInit {



  constructor() { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    // tslint:disable-next-line:typedef
    function focus() { $('#user').focus(); }
    $('.terminal').show(); focus();
    // Focus, focus everywhere.
    // tslint:disable-next-line:only-arrow-functions typedef
    $(window).focus(function() {
      focus();
      $('#user').val($('#user').val());
    });
    // tslint:disable-next-line:only-arrow-functions typedef
    $(document).click(function(e) {
      focus();
      $('#user').val($('#user').val());
    });
    // tslint:disable-next-line:only-arrow-functions typedef
    $('#user').on('input', function(e){
      // @ts-ignore
      $('.clone').text($(this).val());
    });
    // Si es usuario presiona alguna tecla
    let caso;
    const cases = ['clear', 'help', 'resumen', 'cv', 'portafolio', 'contacto']; // Casos
    // tslint:disable-next-line:typedef
    $('#user').keypress(function(e) {
      // Si es usuario presiona enter
      if (e.keyCode === 13) {
        document.getElementById('respuesta').innerHTML = '';
        // @ts-ignore
        document.getElementById('respuesta').style = 'margin-block-start: -1em;';
        e.preventDefault();
        const valor = $(this).val(); // Rescatamos valor
        $(this).val(''); // Hacemos clear al input
        $('.clone').text(''); // Hacemos clear al clon
        $('#respuesta').append('<p class="command">$ ' + valor + '</p>'); // Simulamos metida del comando en contenedor
        if (typeof valor === 'string') {
          caso = cases.indexOf(valor);
        } // views.js -> tomamos valor del array
        if (caso === -1) { // Si no existe el comando regresa -1
          $('#respuesta').append('<p class="respuesta">Comando "' + valor + '" no identificado.<br />Para ver lista de comandos, escribe: help</p>');
        } else {
          terminal(caso); // Si existe regresa 1..oo, ejecutamos función terminal
        }
      }
    });

    // tslint:disable-next-line:typedef no-shadowed-variable
    function terminal(caso) {
      const commands = {
        1: 'Comandos disponibles:<br />clear<br />help<br />resumen<br />cv<br />portafolio<br />contacto',
        2: 'Muestra Resumen.',
        3: 'Muestra CV.',
        4: 'Muestra Portafolio.',
        5: 'Muestra Contacto.'
      }; // Respuesta a comandos
      // Comando es un objeto, accedemos al caso
      if (commands[caso]) { // Si el caso tiene valor
        const x = commands[caso]; // asignamos a variable
        $('#respuesta').append('<p class="respuesta">' + x + '</p>'); // Simulamos respuesta
      } else { // Si no, es el primer comando, es decir, comando clear (limpia pantalla)
        $('#respuesta, .info').empty(); // Pasamos un trapito
      }
    }
    // Función para hacer blink al cursor
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
