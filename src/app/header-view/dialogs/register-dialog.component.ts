import {Component, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {User} from '../models/userRegister.model';
import {HttpService} from '../../shared/http.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  templateUrl: 'register-dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class RegisterDialogComponent {
  static END_POINT = environment.SERVER;
  static USER = '/users';
  user: User;
  hide = true;

  constructor(@Inject(MAT_DIALOG_DATA) data: User, private httpService: HttpService, private router: Router,
              private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.user = data ? data : {
      email: undefined, password: undefined
    };
  }

  register(): void {
    this.httpService.post(RegisterDialogComponent.END_POINT + RegisterDialogComponent.USER, this.user)
      .subscribe();
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
