import { Component } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-project-package-context-view',
  templateUrl: './project-package-context-view.component.html',
  styleUrls: ['./project-package-context-view.component.css']
})
export class ProjectPackageContextViewComponent {

  addAccountContext = 'add:\n' +
    '  members:\n' +
    '     - package: Package1\n' +
    '     - actor: Actor1\n' +
    '     - usecase: UseCase1\n' +
    '     - class: Class1\n' +
    '       modifiers: public abstract\n' +
    '     - enum: Enum1\n' +
    '     - interface: Interface1\n' +
    '  relations:\n' +
    '     - inheritance: (relative path from project separated by \'.\').Member1\n' +
    '       role: role\n' +
    '     - composition: (relative path from project separated by \'.\').Member2\n' +
    '     - aggregation: (relative path from project separated by \'.\').Member3\n' +
    '       role: role\n' +
    '     - association: (relative path from project separated by \'.\').Member4\n' +
    '     - use: (relative path from project separated by \'.\').Member5';
  modifyAccountContext = 'modify:\n' +
    '  members:\n' +
    '    - class: Class1\n' +
    '      set: NewClass\n' +
    '  relations:\n' +
    '    - inheritance: (relative path from project separated by \'.\').Member1\n' +
    '      set: NewMember\n' +
    '      role: newRole';
  deleteAccountContext = 'delete:\n' +
    '  members:\n' +
    '    - interface: Interface1\n' +
    '  relations:\n' +
    '    - composition: (relative path from project separated by \'.\').Member1';
  message = 'Code copied';
  action = 'Ok';

  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(): void {
    this.snackBar.open(this.message, this.action, {
      duration: 2000
    });
  }

}
