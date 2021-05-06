import {Component, Input, OnChanges} from '@angular/core';
import {encode64} from './base64-encoder';
import pako from 'pako';

@Component({
  selector: 'app-diagram-view',
  templateUrl: './diagram-view.component.html',
  styleUrls: ['./diagram-view.component.css']
})
export class DiagramViewComponent implements OnChanges {

  @Input() plantUML: string;
  diagramRoute: string;

  constructor() {
    this.diagramRoute = 'https://media1.tenor.com/images/784b9b582c87db36577e99ed1022e323/tenor.gif?itemid=17804693';
  }

  ngOnChanges(): void {
    console.log('Ha cambiado');
    this.diagramRoute = 'http://www.plantuml.com/plantuml/svg/~1' + encode64(pako.deflate(this.plantUML, {level: 9})); // img para png
  }

}
