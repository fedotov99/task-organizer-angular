import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubordinateTasksComponent } from './subordinate-tasks.component';

describe('TasksComponent', () => {
  let component: SubordinateTasksComponent;
  let fixture: ComponentFixture<SubordinateTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubordinateTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubordinateTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
