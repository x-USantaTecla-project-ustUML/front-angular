import {Component, Input, OnChanges} from '@angular/core';
import {encode64} from './base64-encoder';
import pako from 'pako';
import {mouseWheelZoom} from 'mouse-wheel-zoom';

@Component({
  selector: 'app-diagram-view',
  templateUrl: './diagram-view.component.html',
  styleUrls: ['./diagram-view.component.css']
})
export class DiagramViewComponent implements OnChanges {

  @Input() plantUML: string;
  diagramRoute: string;

  ngOnChanges(): void {
    this.setDiagramRoute();
    const wz = mouseWheelZoom({
      element: document.querySelector('[data-wheel-zoom]'),
      zoomStep: .4
    });
    wz.setSrc(this.diagramRoute);
  }

  onError(): void {
    this.plantUML = 'skinparam Handwritten true\n' +
      'skinparam DefaultTextAlignment center\n' +
      'skinparam NoteBackgroundColor lightyellow\n' +
      'skinparam NoteBorderColor darkgray\\n\' +\n' +
      'note "This member is too big for PlantUML to draw a diagram." as tbd';
    this.setDiagramRoute();
  }

  setDiagramRoute(): void {
    this.diagramRoute = 'https://www.plantuml.com/plantuml/svg/~1' + encode64(pako.deflate(this.plantUML, {level: 9}));
  }

}
