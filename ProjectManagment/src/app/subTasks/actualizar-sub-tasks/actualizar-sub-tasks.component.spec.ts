import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarSubTasksComponent } from './actualizar-sub-tasks.component';

describe('ActualizarSubTasksComponent', () => {
  let component: ActualizarSubTasksComponent;
  let fixture: ComponentFixture<ActualizarSubTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarSubTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarSubTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
