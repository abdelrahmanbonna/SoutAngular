import { TestBed } from '@angular/core/testing';

import { SoutplayerServiceService } from './soutplayer-service.service';

describe('SoutplayerServiceService', () => {
  let service: SoutplayerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoutplayerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
