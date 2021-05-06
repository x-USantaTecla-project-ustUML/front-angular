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
    this.plantUML = '';
    this.USTUML = '';
  }

  ngOnInit(): void {
  }

  sendUMLToChildren(commandResponse: CommandResponse): void {
    this.plantUML = commandResponse.plantUML;
    this.USTUML = commandResponse.ustUML;
  }

}
