import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-docs-inverse-engineering-view',
  templateUrl: './docs-inverse-engineering-view.component.html',
  styleUrls: ['./docs-inverse-engineering-view.component.css']
})
export class DocsInverseEngineeringViewComponent {

  importCommand = 'import: urlGitHubRepository';
  message = 'Code copied';
  action = 'Ok';

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(): void {
    this._snackBar.open(this.message, this.action);
  }

}
