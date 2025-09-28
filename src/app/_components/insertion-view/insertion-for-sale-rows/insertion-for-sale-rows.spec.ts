import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertionForSaleRows } from './insertion-for-sale-rows';

describe('InsertionForSaleRows', () => {
  let component: InsertionForSaleRows;
  let fixture: ComponentFixture<InsertionForSaleRows>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertionForSaleRows]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertionForSaleRows);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
