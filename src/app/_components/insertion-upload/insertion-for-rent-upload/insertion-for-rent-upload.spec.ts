import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertionForRentUpload } from './insertion-for-rent-upload';

describe('InsertionForRentUpload', () => {
  let component: InsertionForRentUpload;
  let fixture: ComponentFixture<InsertionForRentUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertionForRentUpload]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertionForRentUpload);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
