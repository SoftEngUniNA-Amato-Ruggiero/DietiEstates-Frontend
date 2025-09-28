import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsField } from './tags-field';

describe('TagsField', () => {
  let component: TagsField;
  let fixture: ComponentFixture<TagsField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagsField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagsField);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
