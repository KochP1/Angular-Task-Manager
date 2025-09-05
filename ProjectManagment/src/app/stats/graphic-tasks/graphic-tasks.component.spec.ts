import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicTasksComponent } from './graphic-tasks.component';

describe('GraphicTasksComponent', () => {
  let component: GraphicTasksComponent;
  let fixture: ComponentFixture<GraphicTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphicTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
