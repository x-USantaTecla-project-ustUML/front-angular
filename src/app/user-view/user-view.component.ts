import { Component, OnInit } from '@angular/core';
import {CommandResponse} from './command-response.model';

@Component({
  selector: 'app-on-project',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  plantUML: string;
  USTUML: string;

  constructor() {
    this.plantUML = 'skinparam Handwritten true\n' +
      'skinparam DefaultTextAlignment center\n' +
      'skinparam NoteBackgroundColor lightyellow\n' +
      'skinparam NoteBorderColor darkgray\n' +
      'note "This diagram still needs to be done" as tbd';
    this.USTUML = '';
  }

  ngOnInit(): void {
  }

  sendUMLToChildren(commandResponse: CommandResponse): void {
    this.plantUML = commandResponse.plantUML;
    this.USTUML = commandResponse.ustUML;
  }

}
