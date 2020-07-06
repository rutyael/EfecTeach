import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApdateDetailsTeacherComponent } from './apdate-details-teacher.component';

describe('ApdateDetailsTeacherComponent', () => {
  let component: ApdateDetailsTeacherComponent;
  let fixture: ComponentFixture<ApdateDetailsTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApdateDetailsTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApdateDetailsTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
