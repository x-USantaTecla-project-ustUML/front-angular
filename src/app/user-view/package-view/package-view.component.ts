import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-package-view',
  templateUrl: './package-view.component.html',
  styleUrls: ['./package-view.component.css']
})
export class PackageViewComponent {
  yamlUml: string;

  constructor() {
    this.yamlUml =
`class: Name
  modifiers: abstract
  members:
    - definition: private Type name
    - definition: static Type name
    - definition: Type name()
    - definition: public Type name(Type name)
    - definition: private static Type name(Type name, Type name)`;
  }
}
