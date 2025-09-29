import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedSearch } from './advanced-search';

describe('AdvancedSearch', () => {
  let component: AdvancedSearch;
  let fixture: ComponentFixture<AdvancedSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancedSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvancedSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
