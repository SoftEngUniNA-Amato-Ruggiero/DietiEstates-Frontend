import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestButtons } from './test-buttons';

describe('TestButtons', () => {
  let component: TestButtons;
  let fixture: ComponentFixture<TestButtons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestButtons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestButtons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
