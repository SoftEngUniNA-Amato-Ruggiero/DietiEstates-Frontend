import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertionViewModal } from './insertion-view-modal';

describe('InsertionViewModal', () => {
  let component: InsertionViewModal;
  let fixture: ComponentFixture<InsertionViewModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertionViewModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertionViewModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
