import {Component, OnInit} from '@angular/core';
import {CommandResponse} from './command-response.model';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';
import {UserViewService} from './user-view.service';

@Component({
  selector: 'app-on-project',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  plantUML: string;
  USTUML: string;
  directoryTree: any;
  selectedNodeId: string;

  constructor(private authService: AuthService, private userViewService: UserViewService, private router: Router) {
    this.plantUML = 'skinparam Handwritten true\n' +
      'skinparam DefaultTextAlignment center\n' +
      'skinparam NoteBackgroundColor lightyellow\n' +
      'skinparam NoteBorderColor darkgray\\n\' +\n' +
      'note "Introduce this command to create yout first project:\\n\\nadd:\\n  members:\\n    - project: MyProject\\n\\n ' +
      'or generate it automatically by importing your git repository:\\n\\nimport: https://github.com/USantaTecla-tool-ustUML/back-spring" as tbd';
    this.USTUML = '';
    this.directoryTree = [{name: this.authService.getEmail()}];
    this.selectedNodeId = this.authService.getEmail();
  }

  ngOnInit(): void {
    this.redirectIfNotAuthenticated();
    this.userViewService.getContext().subscribe(response => {
      if (response.ustUML !== '') {
        this.USTUML = response.ustUML;
        this.plantUML = response.plantUML;
        this.directoryTree = JSON.parse('[' + response.directoryTree + ']');
        this.setSelectedNodeStyle();
      }
    });
  }

  private setSelectedNodeStyle(): void {
    const selectedNodeId = this.USTUML.split('members')[0].split(':')[1];
    if (selectedNodeId !== undefined) {
      selectedNodeId.replace(' ', '').replace('\n', '');
    }
    if (selectedNodeId !== undefined) {
      this.selectedNodeId = selectedNodeId;
    } else {
      this.selectedNodeId = this.authService.getEmail();
    }
  }

  sendUMLToChildren(commandResponse: CommandResponse): void {
    this.plantUML = commandResponse.plantUML;
    this.USTUML = commandResponse.ustUML;
    this.directoryTree = JSON.parse('[' + commandResponse.directoryTree + ']');
  }

  redirectIfNotAuthenticated(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/notFound']);
    }
  }

}
