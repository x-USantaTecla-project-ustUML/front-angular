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
    this.email = '';
  }

  login(): void {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(this.email).toLowerCase())){
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
    }else{
      this.snackBar.open('Please enter a valid email', 'Error', {
        duration: 3000,
      });
    }
  }

}
