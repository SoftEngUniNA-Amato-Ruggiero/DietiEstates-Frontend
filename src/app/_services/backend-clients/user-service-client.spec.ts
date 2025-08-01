import { TestBed } from '@angular/core/testing';

import { UserServiceClient } from './user-service-client';

describe('UserServiceClient', () => {
  let service: UserServiceClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserServiceClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
