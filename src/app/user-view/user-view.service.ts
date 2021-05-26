import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpService} from '../shared/http.service';
import {Observable} from 'rxjs';
import {CommandResponse} from './command-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserViewService {

  static COMMAND = environment.SERVER + '/command';

  constructor(private httpService: HttpService) {
  }

  getContext(): Observable<CommandResponse> {
    return this.httpService
      .get(UserViewService.COMMAND);
  }

}
