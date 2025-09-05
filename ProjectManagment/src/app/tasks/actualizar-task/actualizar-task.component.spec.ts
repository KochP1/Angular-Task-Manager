import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarTaskComponent } from './actualizar-task.component';

describe('ActualizarTaskComponent', () => {
  let component: ActualizarTaskComponent;
  let fixture: ComponentFixture<ActualizarTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
