import { Component, OnInit, Input } from '@angular/core';
import { Answer } from '../answer.model';
import { Question } from 'src/app/Question/question.model';
import { UserQuestion } from 'src/app/Question/user-question.model';

import { AnswerServiceService } from '../answer-service.service';
import { UserService } from 'src/app/User/user.service';
import { User } from 'src/app/User/user.model';
import { Router } from '@angular/router';
import { FullUserQuestion } from 'src/app/Question/FullUserQuestion.model';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-answer-to-question',
  templateUrl: './answer-to-question.component.html',
  styleUrls: ['./answer-to-question.component.css']
})
export class AnswerToQuestionComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar, private AnswerServide: AnswerServiceService, private UserService: UserService, private route: Router) { }
  @Input("questionSelect") question: FullUserQuestion;
  Reply: User;
  answer: string = null;
  user: User = null;
  ifDisablePost: boolean;
  ifPost: boolean;
  Noanswer: string = null;

  // Fill in the answer text
  SetAnswer(event) {
    this.Noanswer = "";
    this.answer = event;
  }

  // Post answer to the answer table
  postAnswer() {
    if (this.answer == null) {
      this.Noanswer = "אנא מלא את תוכן התשובה";
    }
    else if (this.answer.length != 0 && this.ifPost == false) {
      if (this.user == null)
        this.route.navigate(['LoginGuest/addAnswer']);
      else {
        var ans: Answer = new Answer(0, this.question.userQuestion.QuestionId, this.user.UserId, this.answer, "", new Date);
        this.AnswerServide.PostAnswer(ans).subscribe(x => {
          if (x == null)
            this._snackBar.open("הפעולה נכשלה, אנא נסה שוב", "", {
              duration: 4000,
            });
          else {
            this._snackBar.open("הפעולה התבצעה בהצלחה", "", {
              duration: 4000,
            });
            this.ifDisablePost = true;
          }
        })
        this.ifPost = true;
      }
    }

  }
  ngOnInit(): void {
    this.ifPost = false;
    this.ifDisablePost = false;
    this.user = JSON.parse(sessionStorage.getItem("CurrentUser"));
    this.Reply = this.user;
  }
}
