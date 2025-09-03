import { TestBed } from '@angular/core/testing';

import { GeoapifyClientService } from './geoapify-client-service';

describe('GeoapifyClientService', () => {
  let service: GeoapifyClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeoapifyClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
