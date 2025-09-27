import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyInfo } from './agency-info';

describe('AgencyInfo', () => {
  let component: AgencyInfo;
  let fixture: ComponentFixture<AgencyInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgencyInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencyInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
