import { TestBed } from '@angular/core/testing';

import { DistanceConverter } from './distance-converter';

describe('DistanceConverter', () => {
  let service: DistanceConverter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistanceConverter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
