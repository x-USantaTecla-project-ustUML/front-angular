import {Component, OnInit} from '@angular/core';
import {CommandResponse} from './command-response.model';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-on-project',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit{

  plantUML: string;
  USTUML: string;

  constructor(private authService: AuthService, private router: Router) {
    this.plantUML = 'skinparam Handwritten true\n' +
      'skinparam DefaultTextAlignment center\n' +
      'skinparam NoteBackgroundColor lightyellow\n' +
      'skinparam NoteBorderColor darkgray\\n\' +\n' +
      'note "Introduce this command to create yout first project:\\n\\nadd:\\n  members:\\n    - project: MyProject" as tbd';
    this.USTUML = '';
  }

  ngOnInit(): void {
    this.redirectIfNotAuthenticated();
  }

  sendUMLToChildren(commandResponse: CommandResponse): void {
    this.plantUML = commandResponse.plantUML;
    this.USTUML = commandResponse.ustUML;
  }

  redirectIfNotAuthenticated(): void {
    if (!this.authService.isAuthenticated()){
      this.router.navigate(['/notFound']);
    }
  }

}
