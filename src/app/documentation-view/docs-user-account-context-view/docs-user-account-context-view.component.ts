import { Component } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-docs-user-account-context-view',
  templateUrl: './docs-user-account-context-view.component.html',
  styleUrls: ['./docs-user-account-context-view.component.css']
})
export class DocsUserAccountContextViewComponent {

  addAccountContext = ' add:\n' +
    '   members:\n' +
    '     - project: Project1\n' +
    '     - project: Project2\n' +
    '       members: \n' +
    '         - package: package\n' +
    '           members:\n' +
    '             - class: class';
  modifyAccountContext = 'modify:\n' +
    '  members:\n' +
    '    - project: Project\n' +
    '      set: NewProject';
  deleteAccountContext = 'delete:\n' +
    '  members:\n' +
    '    - project: Project';
  message = 'Code copied';
  action = 'Ok';

  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(): void {
    this.snackBar.open(this.message, this.action, {
      duration: 2000
    });
  }

}
