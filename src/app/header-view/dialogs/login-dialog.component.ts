import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../../shared/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  templateUrl: 'login-dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class LoginDialogComponent {
  email: string;
  password: string;

  constructor(private auth: AuthService, private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  login(): void {
    this.auth.login(this.email, this.password).subscribe(
      () => {
        this.router.navigate(['user-view']).then().finally(() => this.dialog.closeAll());
      },
      error => {
        this.snackBar.open('Incorrect email or password', 'Error', {
          duration: 3000,
        });
      }
    );
  }

}
