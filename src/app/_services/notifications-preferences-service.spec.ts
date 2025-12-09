import { TestBed } from '@angular/core/testing';

import { ChangeNotificationsPreferencesService } from './notifications-preferences-service';

describe('ChangeNotificationsPreferencesService', () => {
  let service: ChangeNotificationsPreferencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeNotificationsPreferencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
