import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-enum-context-view',
  templateUrl: './enum-context-view.component.html',
  styleUrls: ['./enum-context-view.component.css']
})
export class EnumContextViewComponent {

  addAccountContext = 'add:\n' +
    '  objects:\n' +
    '    - object: OBJECT\n';
  modifyAccountContext = 'modify:\n' +
    '  objects:\n' +
    '    - object: OBJECT\n' +
    '      set: NEWOBJECT\n';
  deleteAccountContext = 'delete:\n' +
    '  objects:\n' +
    '    - object: OBJECT\n';
  message = 'Code copied';
  action = 'Ok';

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(): void {
    this._snackBar.open(this.message, this.action);
  }

}
