import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-docs-direct-engineering-view',
  templateUrl: './docs-direct-engineering-view.component.html',
  styleUrls: ['./docs-direct-engineering-view.component.css']
})
export class DocsDirectEngineeringViewComponent {

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

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(): void {
    this._snackBar.open(this.message, this.action);
  }

}
