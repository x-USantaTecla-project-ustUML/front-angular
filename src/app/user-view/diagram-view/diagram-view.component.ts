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
  }

  ngOnChanges(): void {
    this.diagramRoute = 'http://www.plantuml.com/plantuml/svg/~1' + encode64(pako.deflate(this.plantUML, {level: 9})); // img para png
  }

}
