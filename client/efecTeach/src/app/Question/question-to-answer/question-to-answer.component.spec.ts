import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionToAnswerComponent } from './question-to-answer.component';

describe('QuestionToAnswerComponent', () => {
  let component: QuestionToAnswerComponent;
  let fixture: ComponentFixture<QuestionToAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionToAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionToAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
