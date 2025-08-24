import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyManagement } from './agency-management';

describe('AgencyManagement', () => {
  let component: AgencyManagement;
  let fixture: ComponentFixture<AgencyManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgencyManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencyManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
