import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsPreferences } from './notifications-preferences';

describe('NotificationsPreferences', () => {
  let component: NotificationsPreferences;
  let fixture: ComponentFixture<NotificationsPreferences>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsPreferences]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationsPreferences);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
