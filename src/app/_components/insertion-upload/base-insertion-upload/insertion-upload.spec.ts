import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertionUpload } from './insertion-upload';

describe('InsertionUpload', () => {
  let component: InsertionUpload;
  let fixture: ComponentFixture<InsertionUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertionUpload]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertionUpload);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
