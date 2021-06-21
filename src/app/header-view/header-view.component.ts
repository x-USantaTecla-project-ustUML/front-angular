import {Component} from '@angular/core';
import {LoginDialogComponent} from './dialogs/login-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../shared/auth.service';
import {RegisterDialogComponent} from './dialogs/register-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header-view.component.html',
  styleUrls: ['./header-view.component.css']
})
export class HeaderViewComponent {

  public isCollapsed = true;

  constructor(private dialog: MatDialog, private authService: AuthService) {
  }

  login(): void {
    this.dialog.open(LoginDialogComponent, { panelClass: 'custom-dialog-container' })
      .afterClosed()
      .subscribe();
    this.isCollapsed = true;
  }

  register(): void {
    this.dialog.open(RegisterDialogComponent, { panelClass: 'custom-dialog-container' })
      .afterClosed()
      .subscribe();
    this.isCollapsed = true;
  }

  logout(): void {
    this.authService.logout();
    this.isCollapsed = true;
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

}
