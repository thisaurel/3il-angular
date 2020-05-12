import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskelementComponent } from './taskelement.component';

describe('TaskelementComponent', () => {
  let component: TaskelementComponent;
  let fixture: ComponentFixture<TaskelementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskelementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskelementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
