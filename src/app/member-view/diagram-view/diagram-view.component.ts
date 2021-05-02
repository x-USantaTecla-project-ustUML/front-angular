import {Component, OnInit} from '@angular/core';
import {encode64} from './base64-encoder';
import pako from 'pako';

@Component({
  selector: 'app-diagram-view',
  templateUrl: './diagram-view.component.html',
  styleUrls: ['./diagram-view.component.css']
})
export class DiagramViewComponent implements OnInit {

  diagramRoute: string;

  constructor() {
  }

  ngOnInit(): void {
    this.generateDiagram();
  }

  generateDiagram(): void {
    const plantuml = 'abstract class Name {\n' +
      '- name: Type\n' +
      '~ {static} name: Type\n' +
      '~ name(): Type\n' +
      '+ name(name: Type): Type\n' +
      '- {abstract} name(name: Type, name: Type): Type\n' +
      '}';
    this.diagramRoute = 'http://www.plantuml.com/plantuml/svg/~1' + encode64(pako.deflate(plantuml, {level: 9})); // img para png
  }

}
