import {Component} from '@angular/core';
import {CommandResponse} from './command-response.model';

@Component({
  selector: 'app-on-project',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent {

  plantUML: string;
  USTUML: string;

  constructor() {
    this.plantUML = 'skinparam Handwritten true\n' +
      'skinparam DefaultTextAlignment center\n' +
      'skinparam NoteBackgroundColor lightyellow\n' +
      'skinparam NoteBorderColor darkgray\\n\' +\n' +
      'note "Introduce this command to create yout first project:\\n\\nadd:\\n  members:\\n    - project: MyProject" as tbd';
    this.USTUML = '';
  }

  sendUMLToChildren(commandResponse: CommandResponse): void {
    this.plantUML = commandResponse.plantUML;
    this.USTUML = commandResponse.ustUML;
  }

}
