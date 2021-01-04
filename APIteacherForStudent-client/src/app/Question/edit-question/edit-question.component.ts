import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserQuestion } from '../user-question.model';
import { QuestionServiceService } from '../question-service.service';
import { FormControl } from '@angular/forms';
import { UserAnswer } from 'src/app/Answer/user-answer.model';
import { AnswerServiceService } from 'src/app/Answer/answer-service.service';
import { User } from 'src/app/User/user.model';
import { UserService } from 'src/app/User/user.service';
import { CommentQuestion } from '../CommentQuestion.model';
import { CommentAnswer } from 'src/app/Answer/CommentAnswer.model';
import { FullUserQuestion } from '../FullUserQuestion.model';
import { FullUserAnswer } from 'src/app/Answer/FullUserAnswer.model';
import { Location } from '@angular/common';
import { MatSnackBar  } from '@angular/material/snack-bar';




@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css', '../../edit-content.css']
})
export class EditQuestionComponent implements OnInit {

  question: FullUserQuestion = null;
  AddQuestioner = new FormControl(false);
  answers: FullUserAnswer[] = [];
  userEnter: User;
  ifCheckBox: boolean = false;
  disableCheckBox: boolean = false;
  comment: string;
  commentQ_A: CommentQuestion;
  Loading: boolean = true;
  CommentFill: string;
  commentAnswers: CommentAnswer[][];
  commentQ: string;
  errPostCommentQ: string;
  disabledQ: boolean;


  constructor(private _snackBar: MatSnackBar, private _location: Location, private route: Router, private router: ActivatedRoute, private QuestionService: QuestionServiceService, private answerService: AnswerServiceService, private userService: UserService) { }
  panelOpenState = false;
  askQuestion: boolean;

  // back
  backClicked() {
    this._location.back();
  }

  // Adding a question to a question
  PlusQuestioner() {
    this.askQuestion = true;
    this.question.userQuestion.NumQuestioners = this.question.userQuestion.NumQuestioners + 1;
    this.QuestionService.PutQuestion(this.question.userQuestion).subscribe(x => console.log(x));
  }

  IfFilterQuestion() {
    if (this.route.url.includes('Personal'))
      return false;
    else return true;
  }

  // post comment question
  postComment() {
    debugger
    this.errPostCommentQ = '';
    this.CommentFill = '';
    if (this.userEnter == null)
      this.route.navigate(['LoginGuest/addComment']);
    else {
      if (this.commentQ != null && this.commentQ != '') {
        this.commentQ_A = new CommentQuestion(this.userEnter.UserId, this.commentQ, this.question.userQuestion.QuestionId, new Date(), new Date(), '', '');
        debugger
        this.QuestionService.PostComment(this.commentQ_A).subscribe(x => {
          if (x == null)
            this._snackBar.open("הפעולה נכשלה, בדוק האם כבר הערת על שאלה זו", "", {
              duration: 4000,
            });
          else{
            this._snackBar.open("הפעולה התבצעה בהצלחה", "", {
              duration: 4000,
            });
            this.disabledQ = true;
          } 
        })
      }
      else this.CommentFill = 'אנא מלא את תוכן ההערה';
    }
  }

  ngOnInit(): void {
    //עושה שגיאה לפני ההעלאה
    this.askQuestion = false;
    this.errPostCommentQ = '';
    this.disabledQ = false;
    this.ifCheckBox = false;
    this.disableCheckBox = false;
    this.userEnter = JSON.parse(sessionStorage.getItem("CurrentUser"));
    this.router.paramMap.subscribe(res =>
      this.QuestionService.GetQuestionById(Number((res.get("id")))).subscribe(res => {
        this.question = new FullUserQuestion();
        this.question = res;
        this.QuestionService.GetCommentQuestionById(this.question.userQuestion.QuestionId).subscribe(x => {
          this.question.commentsQuestion = x;
          this.answerService.AnswersToQuestions(this.question.userQuestion.QuestionId).subscribe(res => {
            this.answers = res;
          })
          this.Loading = false;
        });

      }));
  }

}

