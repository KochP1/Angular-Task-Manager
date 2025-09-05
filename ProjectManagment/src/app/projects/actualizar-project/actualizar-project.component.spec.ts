import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarProjectComponent } from './actualizar-project.component';

describe('ActualizarProjectComponent', () => {
  let component: ActualizarProjectComponent;
  let fixture: ComponentFixture<ActualizarProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
