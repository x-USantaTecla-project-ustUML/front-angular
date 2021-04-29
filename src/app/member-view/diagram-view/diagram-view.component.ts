import { Component, OnInit } from '@angular/core';
import pako from 'pako';

@Component({
  selector: 'app-diagram-view',
  templateUrl: './diagram-view.component.html',
  styleUrls: ['./diagram-view.component.css']
})
export class DiagramViewComponent implements OnInit {

  diagramRoute: string;

  constructor() {
    this.diagramRoute = 'https://support.bizzdesign.com/download/attachments/39814392/uml_model_class_diagr4_en.png?version=1&modificationDate=1560268351730&api=v2';
  }

  ngOnInit(): void {
    this.generateDiagram();
  }

  encode64(data): string {
    console.log(data);
    let r = '';
    for (let i = 0; i < data.length; i += 3) {
      if (i + 2 === data.length) {
        r += this.append3bytes(data[i], data[i + 1], 0);
      } else if (i + 1 === data.length) {
        r += this.append3bytes(data[i], 0, 0);
      } else {
        r += this.append3bytes(data[i], data[i + 1],
          data[i + 2]);
      }
    }
    return r;
  }

  append3bytes(b1, b2, b3): string {
    /* tslint:disable:no-bitwise */
    const c1 = b1 >> 2;
    const c2 = ((b1 & 0x3) << 4) | (b2 >> 4);
    const c3 = ((b2 & 0xF) << 2) | (b3 >> 6);
    const c4 = b3 & 0x3F;
    let r = '';
    r += this.encode6bit(c1 & 0x3F);
    r += this.encode6bit(c2 & 0x3F);
    r += this.encode6bit(c3 & 0x3F);
    r += this.encode6bit(c4 & 0x3F);
    /* tslint:enable:no-bitwise */
    return r;
  }

  encode6bit(b): string {
    if (b < 10) {
      return String.fromCharCode(48 + b);
    }
    b -= 10;
    if (b < 26) {
      return String.fromCharCode(65 + b);
    }
    b -= 26;
    if (b < 26) {
      return String.fromCharCode(97 + b);
    }
    b -= 26;
    if (b === 0) {
      return '-';
    }
    if (b === 1) {
      return '_';
    }
    return '?';
  }

  generateDiagram(): void {
    const plantuml = 'abstract class Name {\n' +
      '- name: Type\n' +
      '~ {static} name: Type\n' +
      '~ name(): Type\n' +
      '+ name(name: Type): Type\n' +
      '- {abstract} name(name: Type, name: Type): Type\n' +
      '}';
    this.diagramRoute = 'http://www.plantuml.com/plantuml/svg/~1' + this.encode64(pako.deflate(plantuml, {level: 9})); // img para png
  }

}
