import { TestBed } from '@angular/core/testing';

import { ReportBlockService } from './report-block.service';

describe('ReportBlockService', () => {
  let service: ReportBlockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportBlockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
