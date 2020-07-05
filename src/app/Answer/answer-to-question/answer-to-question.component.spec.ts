import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerToQuestionComponent } from './answer-to-question.component';

describe('AnswerToQuestionComponent', () => {
  let component: AnswerToQuestionComponent;
  let fixture: ComponentFixture<AnswerToQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerToQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerToQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
