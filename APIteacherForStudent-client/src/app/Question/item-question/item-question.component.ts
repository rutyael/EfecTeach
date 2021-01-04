import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserQuestion } from '../user-question.model';
import { ProffestionService } from 'src/app/Proffestion/proffestion.service';
import { QuestionServiceService } from '../question-service.service';
import { UserService } from 'src/app/User/user.service';


@Component({
  selector: 'app-item-question',
  templateUrl: './item-question.component.html',
  styleUrls: ['./item-question.component.css']

})
export class ItemQuestionComponent implements OnInit {

  constructor(private QuestionService: QuestionServiceService, private proffestionService: ProffestionService, private router: Router, private route: ActivatedRoute) { }

  @Input() question: UserQuestion;
  questionSlice: string;
  ifTwoLong: string;
  askQuestion: boolean;


  // Add a view to the question
  PlusQuestionView() {
    this.question.QuestionView = (this.question.QuestionView) + 1;
    this.QuestionService.PutQuestion(this.question).subscribe(x => console.log(x));
  }

  // ask current question
  AskCurrentQuestion() {
    this.question.NumQuestioners = this.question.NumQuestioners + 1;
    this.QuestionService.PutQuestion(this.question).subscribe(x => console.log(x));
    this.askQuestion = true;
  }


  // slice relevant content
  // if content question is two long
  Content(content: string) {
    var element = document.createElement('span');
    element.innerHTML = content;
    var element_content = element.innerText;
    element_content = element_content.slice(0, 100);
    element_content=element_content.concat('...');
    element.innerText = element_content;
    return element.innerHTML;
  }
  ngOnInit(): void {
    this.askQuestion = false;
    this.questionSlice = this.Content(this.question.QuestionContent);
  }
}
