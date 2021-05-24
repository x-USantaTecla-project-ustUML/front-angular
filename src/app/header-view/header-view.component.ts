import {Component, OnInit} from '@angular/core';
import {LoginDialogComponent} from './dialogs/login-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../shared/auth.service';
import {RegisterDialogComponent} from './dialogs/register-dialog.component';
import {NavigationEnd, NavigationStart, Router, RouterEvent} from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header-view.component.html',
  styleUrls: ['./header-view.component.css']
})
export class HeaderViewComponent implements OnInit {

  public isCollapsed = true;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  authenticated: boolean;

  constructor(private dialog: MatDialog, private authService: AuthService,
              public location: Location, private router: Router) {
  }

  ngOnInit(): void{
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
      if (event instanceof NavigationStart) {
        if (event.url !== this.lastPoppedUrl) {
          this.yScrollStack.push(window.scrollY);
        }
      } else if (event instanceof NavigationEnd) {
        if (event.url === this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else {
          window.scrollTo(0, 0);
        }
      }
    });
    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });
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
    if (this.authenticated && !this.authService.isAuthenticated()){
      this.logout();
    }
    this.authenticated = this.authService.isAuthenticated();
    return this.authenticated;
  }

}
