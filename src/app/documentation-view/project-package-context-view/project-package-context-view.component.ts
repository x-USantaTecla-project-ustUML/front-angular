import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-project-package-context-view',
  templateUrl: './project-package-context-view.component.html',
  styleUrls: ['./project-package-context-view.component.css']
})
export class ProjectPackageContextViewComponent {

  addAccountContext = 'add:\n' +
    '    members:\n' +
    '       - package: package\n' +
    '       - class: class\n' +
    '         modifiers: public abstract\n' +
    '       - enum: enum\n' +
    '       - interface: interface\n' +
    '    relations:\n' +
    '       - inheritance: Member\n' +
    '         role: role\n' +
    '       - composition: Member\n' +
    '       - aggregation: Member\n' +
    '         role: role\n' +
    '       - association: Member\n' +
    '       - use: Member\n';
  modifyAccountContext = 'modify:\n' +
    '  members:\n' +
    '    - class: Class\n' +
    '      set: NewClass\n' +
    '  relations:\n' +
    '    - inheritance: Member\n' +
    '      set: NewMember\n' +
    '      role: newRole\n';
  deleteAccountContext = 'delete:\n' +
    '  members:\n' +
    '    - interface: Interface\n' +
    '  relations:\n' +
    '    - composition: Member \n';
  message = 'Code copied';
  action = 'Ok';

  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(): void {
    this.snackBar.open(this.message, this.action, {
      duration: 2000
    });
  }

}
