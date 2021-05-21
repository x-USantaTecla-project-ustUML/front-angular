import {Component, OnInit} from '@angular/core';
import {LoginDialogComponent} from './dialogs/login-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../shared/auth.service';
import {RegisterDialogComponent} from './dialogs/register-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header-view.component.html',
  styleUrls: ['./header-view.component.css']
})
export class HeaderViewComponent implements OnInit{

  constructor(private dialog: MatDialog, private authService: AuthService) {
  }

  ngOnInit(): void{
    console.log(this.authService.getToken());
  }

  login(): void {
    this.dialog.open(LoginDialogComponent)
      .afterClosed()
      .subscribe();
  }

  register(): void {
    this.dialog.open(RegisterDialogComponent)
      .afterClosed()
      .subscribe();
  }

  logout(): void {
    this.authService.logout();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

}
