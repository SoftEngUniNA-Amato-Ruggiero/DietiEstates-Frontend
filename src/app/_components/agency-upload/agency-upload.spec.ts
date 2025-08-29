import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyUpload } from './agency-upload';

describe('AgencyUpload', () => {
  let component: AgencyUpload;
  let fixture: ComponentFixture<AgencyUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgencyUpload]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencyUpload);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
