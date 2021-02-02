import { TestBed } from '@angular/core/testing';

import { FireService } from './fire-service.service';

describe('FireServiceService', () => {
  let service: FireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
