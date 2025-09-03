import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPromotionForms } from './user-promotion-forms';

describe('UserPromotionForms', () => {
  let component: UserPromotionForms;
  let fixture: ComponentFixture<UserPromotionForms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPromotionForms]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPromotionForms);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
