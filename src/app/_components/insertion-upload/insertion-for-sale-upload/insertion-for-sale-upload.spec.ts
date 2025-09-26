import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertionForSaleUpload } from './insertion-for-sale-upload';

describe('InsertionForSaleUpload', () => {
  let component: InsertionForSaleUpload;
  let fixture: ComponentFixture<InsertionForSaleUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertionForSaleUpload]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertionForSaleUpload);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
