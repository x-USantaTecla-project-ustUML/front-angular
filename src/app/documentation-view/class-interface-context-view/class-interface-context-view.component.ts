import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-class-interface-context-view',
  templateUrl: './class-interface-context-view.component.html',
  styleUrls: ['./class-interface-context-view.component.css']
})
export class ClassInterfaceContextViewComponent {

  addClassContext = 'add:\n' +
    '  members:\n' +
    '    - member: private static int attribute\n' +
    '    - member: public abstract String method(int param1, String param2)\n' +
    '  relations:\n' +
    '    - association: (relative path from project separated by \'.\').Member1';
  modifyClassContext = 'modify:\n' +
    '  modifiers: Package1\n' +
    '  set: public abstract\n' +
    '  members:\n' +
    '    - member: private static int attribute\n' +
    '      set: public String newAttribute\n' +
    '    - member: public abstract String method(int param1, String param2)\n' +
    '      set: private int newMethod()\n' +
    '  relations:\n' +
    '    - use: (relative path from project separated by \'.\').Member1\n' +
    '      set: (relative path from project separated by \'.\').NewMember\n' +
    '      role: newRole';
  deleteClassContext = 'delete:\n' +
    '  members:\n' +
    '    - member: public String newAttribute\n' +
    '    - member: private int newMethod()\n' +
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
