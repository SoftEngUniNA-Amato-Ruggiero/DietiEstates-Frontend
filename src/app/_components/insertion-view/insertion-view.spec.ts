import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertionView } from './insertion-view';

describe('InsertionView', () => {
  let component: InsertionView;
  let fixture: ComponentFixture<InsertionView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertionView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertionView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
