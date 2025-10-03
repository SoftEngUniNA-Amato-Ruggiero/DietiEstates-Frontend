import { TestBed } from '@angular/core/testing';

import { InsertionPreviewService } from './insertion-preview-service';

describe('InsertionPreviewService', () => {
  let service: InsertionPreviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsertionPreviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
