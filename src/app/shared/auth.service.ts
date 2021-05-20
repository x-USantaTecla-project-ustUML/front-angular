import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

import {environment} from '../../environments/environment';
import {User} from './user.model';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static END_POINT = environment.SERVER + '/users/token';
  private user: User;
  password: string = undefined;
  private onLogin$ = new Subject<User>();

  constructor(private httpService: HttpService, private router: Router) {
  }

  login(email: string, password: string): Observable<User> {
    return this.httpService.authBasic(email, password)
      .post(AuthService.END_POINT)
      .pipe(
        map(jsonToken => {
          const jwtHelper = new JwtHelperService();
          this.user = jsonToken;
          this.user.email = jwtHelper.decodeToken(jsonToken.token).user;

          this.password = password;
          this.onLogin$.next(this.user);
          return this.user;
        })
      );
  }

  onLogin(): Observable<User> {
    return this.onLogin$.asObservable();
  }

  logout(): void {
    this.user = undefined;
    this.router.navigate(['']).then();
  }

  isAuthenticated(): boolean {
    return this.user != null && !(new JwtHelperService().isTokenExpired(this.user.token));
  }

  getToken(): string {
    return this.user ? this.user.token : undefined;
  }

  getEmail(): string{
    return this.user  ? this.user.email : undefined;
  }

  getPassword(): string{
    return this.user ? this.password : undefined;
  }

  setUser(user: User): void{
    this.user = user;
  }

}
