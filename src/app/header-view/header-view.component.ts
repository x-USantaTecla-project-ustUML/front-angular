import { Component } from '@angular/core';
import {LoginDialogComponent} from './dialogs/login-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header-view.component.html',
  styleUrls: ['./header-view.component.css']
})
export class HeaderViewComponent {

  constructor(private dialog: MatDialog, private authService: AuthService) {
  }

  login(): void {
    this.dialog.open(LoginDialogComponent)
      .afterClosed()
      .subscribe();
  }

  register(): void {
    // this.dialog.open(RegisterDialogComponent);
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

}
