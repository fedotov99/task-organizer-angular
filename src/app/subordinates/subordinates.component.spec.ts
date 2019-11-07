import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubordinatesComponent } from './subordinates.component';

describe('SubordinatesComponent', () => {
  let component: SubordinatesComponent;
  let fixture: ComponentFixture<SubordinatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubordinatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubordinatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
