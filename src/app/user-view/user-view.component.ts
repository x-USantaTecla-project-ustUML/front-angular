import {Component, OnInit} from '@angular/core';
import {CommandResponse} from './command-response.model';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';
import {UserViewService} from './user-view.service';
import {PackageNode} from './package-node.model';



@Component({
  selector: 'app-on-project',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit{

  plantUML: string;
  USTUML: string;
  directoryTree: any;
  selectedNodeId: string;

  constructor(private authService: AuthService, private userViewService: UserViewService, private router: Router) {
    this.plantUML = 'skinparam Handwritten true\n' +
      'skinparam DefaultTextAlignment center\n' +
      'skinparam NoteBackgroundColor lightyellow\n' +
      'skinparam NoteBorderColor darkgray\\n\' +\n' +
      'note "Introduce this command to create yout first project:\\n\\nadd:\\n  members:\\n    - project: MyProject" as tbd';
    this.USTUML = '';
    this.directoryTree = [{name: this.authService.getEmail()}];
    this.selectedNodeId = this.authService.getEmail();
  }

  ngOnInit(): void {
    this.redirectIfNotAuthenticated();
    this.userViewService.getContext().subscribe( response => {
      if (response.ustUML !== ''){
        this.USTUML = response.ustUML;
        this.plantUML = response.plantUML;
        this.directoryTree = JSON.parse('[' + response.directoryTree.replace(', {}', '') + ']');
        this.setSelectedNodeStyle();
      }
    });
  }

  private setSelectedNodeStyle(): void {
      let selectedNodeId = this.USTUML.split('members')[0].split(':')[1];
      if (selectedNodeId !== undefined) {
        selectedNodeId = selectedNodeId.substring(1, selectedNodeId.length - 1);
        this.selectedNodeId = selectedNodeId;
      } else {
        this.selectedNodeId = this.authService.getEmail();
      }
  }

  sendUMLToChildren(commandResponse: CommandResponse): void {
    this.plantUML = commandResponse.plantUML;
    this.USTUML = commandResponse.ustUML;
    this.directoryTree = JSON.parse('[' + commandResponse.directoryTree.replace(', {}', '') + ']');
  }

  redirectIfNotAuthenticated(): void {
    if (!this.authService.isAuthenticated()){
      this.router.navigate(['/notFound']);
    }
  }

}
