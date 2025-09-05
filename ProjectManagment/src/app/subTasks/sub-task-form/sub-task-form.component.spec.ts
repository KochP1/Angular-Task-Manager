import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubTaskFormComponent } from './sub-task-form.component';

describe('SubTaskFormComponent', () => {
  let component: SubTaskFormComponent;
  let fixture: ComponentFixture<SubTaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubTaskFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
