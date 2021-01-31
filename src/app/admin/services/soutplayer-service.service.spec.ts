import { TestBed } from '@angular/core/testing';

import { SoutplayerService } from './soutplayer-service.service';

describe('SoutplayerServiceService', () => {
  let service: SoutplayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoutplayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
