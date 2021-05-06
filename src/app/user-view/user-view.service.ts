import { Injectable } from '@angular/core';
import {HttpService} from '../shared/http.service';
import {CommandResponse} from './command-response.model';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserViewService {

  static COMMAND = environment.SERVER + '/command';

  constructor(private httpService: HttpService) {
  }

  create(command: any): Observable<CommandResponse> {
    return this.httpService
      .post(UserViewService.COMMAND, command);
  }
}
