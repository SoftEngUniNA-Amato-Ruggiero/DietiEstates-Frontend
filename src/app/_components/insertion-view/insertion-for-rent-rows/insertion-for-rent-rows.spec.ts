import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertionForRentRows } from './insertion-for-rent-rows';

describe('InsertionForRentRows', () => {
  let component: InsertionForRentRows;
  let fixture: ComponentFixture<InsertionForRentRows>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertionForRentRows]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertionForRentRows);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
