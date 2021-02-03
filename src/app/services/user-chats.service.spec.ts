import { TestBed } from '@angular/core/testing';

import { UserChatsService } from './user-chats.service';

describe('UserChatsService', () => {
  let service: UserChatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserChatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
