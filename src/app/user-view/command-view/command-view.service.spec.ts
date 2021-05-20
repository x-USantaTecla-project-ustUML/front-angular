import {TestBed} from '@angular/core/testing';

import {CommandViewService} from './command-view.service';

describe('CommandViewService', () => {
  let service: CommandViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandViewService);
  });

});
