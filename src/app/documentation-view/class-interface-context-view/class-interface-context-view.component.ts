import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-class-interface-context-view',
  templateUrl: './class-interface-context-view.component.html',
  styleUrls: ['./class-interface-context-view.component.css']
})
export class ClassInterfaceContextViewComponent {

  addAccountContext = 'add:\n' +
    '    members:\n' +
    '      - member: private static int attribute\n' +
    '      - member: public abstract String method(int param1, String param2)\n' +
    '    relations:\n' +
    '      - association: Member \n';
  modifyAccountContext = 'modify:\n' +
    '  modifiers: package\n' +
    '  set: public abstract\n' +
    '  members:\n' +
    '    - member: private static int attribute\n' +
    '      set: public String newAttribute\n' +
    '    - member: public abstract String method(int param1, String param2)\n' +
    '      set: private int newMethod()\n' +
    '  relations:\n' +
    '    - use: Member\n' +
    '      set: NewMember\n' +
    '      role: newRole\n';
  deleteAccountContext = 'delete:\n' +
    '  members:\n' +
    '    - member: public String newAttribute\n' +
    '    - member: private int newMethod()\n' +
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
