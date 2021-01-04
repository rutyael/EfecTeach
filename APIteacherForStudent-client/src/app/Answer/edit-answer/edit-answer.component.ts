import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerServiceService } from '../answer-service.service';
import { answerOpinion } from '../answerOpinion.model';
import { User } from 'src/app/User/user.model';
import { UserService } from 'src/app/User/user.service';
import { QuestionServiceService } from 'src/app/Question/question-service.service';
import { FullUserAnswer } from '../FullUserAnswer.model';
import { CommentAnswer } from '../CommentAnswer.model';
import { CommentQuestion } from '../../Question/CommentQuestion.model';
import { FullUserQuestion } from 'src/app/Question/FullUserQuestion.model';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-edit-answer',
  templateUrl: './edit-answer.component.html',
  styleUrls: ['./edit-answer.component.css', '../../edit-content.css']
})
export class EditAnswerComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar, private _location: Location, private answerService: AnswerServiceService, private route: Router, private questionService: QuestionServiceService, private router: ActivatedRoute, private Answerservice: AnswerServiceService, private userService: UserService) { }
  answer: FullUserAnswer;
  commentQ_A: CommentQuestion;
  CommentQFill: string;
  answerScoring: string;
  answerComment: string;
  answerFeedback: string;
  userEnter: User = null;
  comment: string;
  newOpinion: answerOpinion;
  teacherEnter: User;
  IfInputAble: boolean;
  CommentFill: string;
  IfScoringNull: boolean = false;
  resultReturn: string;
  questionForAnswer: FullUserQuestion;
  panelOpenState = false;
  commetToAnswer: CommentAnswer;
  ifPost: boolean;
  inputValue: string = null;
  arrscoring: string[] = ["שגוי", "לא מדויק", "מומלץ", "נכון", "יעיל"];
  Scoring: string;
  errPostCommentQ: string;
  errPostCommentA: string;
  disabledQ: boolean;
  disabledA: boolean;
  askQuestion: boolean;
  isShowingQ: boolean;
  isShowingA: boolean;

  // open or close mat-drawer-container Question
  toggleQ() {
    this.isShowingQ = !this.isShowingQ;
  }

  // open or close mat-drawer-container Answer
  toggleA() {
    this.isShowingA = !this.isShowingA;
  }

  // back
  backClicked() {
    this._location.back();
  }

  IfAnswerList() {
    if (this.route.url.includes("Personal"))
      return false;
    else return true;
  }

  // post Questioner to the current Question
  PlusQuestioner() {
    this.askQuestion = true;
    this.questionForAnswer.userQuestion.NumQuestioners = this.questionForAnswer.userQuestion.NumQuestioners + 1;
    this.questionService.PutQuestion(this.questionForAnswer.userQuestion).subscribe(x => console.log(x));
  }

  // if answer scoring is full
  IfAnswerScoring() {
    if (this.answer.userAnswer.Answer.AnswerScoring != null || this.answer.userAnswer.Answer.AnswerScoring != "")
      return true
    else return false;
  }

  // Fill in the answer scoring
  ScoringAnswer(value: string) {
    this.answerScoring = value;
  }

  // post opinion to the opinion table
  postOpinion() {
    this.errPostCommentQ = "";
    this.errPostCommentA = "";
    if (this.answerScoring == null)
      this.IfScoringNull = true;
    else {
      this.newOpinion = new answerOpinion(0, this.teacherEnter.UserId, this.answer.userAnswer.Answer.AnswerId, this.answerScoring, this.answerComment, this.answerFeedback, '');
      this.Answerservice.PostanswerOpinion(this.newOpinion).subscribe(x => {
        if (x = "חוות הדעת נוספה בהצלחה") {
          this._snackBar.open("הפעולה התבצעה בהצלחה", '', {
            duration: 4000,
          });
          this.IfInputAble = true;
        }
        else{
          this._snackBar.open("הפעולה נכשלה, אנא נסה שוב", "", {
            duration: 4000,
          });
        } 
      });
      this.answerScoring = "";
      this.IfScoringNull = false;
    }
  }

  // post comment to the current Question
  postQComment() {
    this.errPostCommentQ = '';
    this.errPostCommentA = '';
    this.CommentQFill = '';
    if (this.userEnter == null)
      this.route.navigate(['LoginGuest/addComment']);
    else {
      if (this.comment != null && this.comment != '') {
        this.commentQ_A = new CommentQuestion(this.userEnter.UserId, this.comment, this.questionForAnswer.userQuestion.QuestionId, new Date(), new Date(), this.questionForAnswer.userQuestion.OuestionTitle, '');
        this.questionService.PostComment(this.commentQ_A).subscribe(x => {
          if (x == null)
            this._snackBar.open("הפעולה נכשלה, בדוק האם כבר הערת על שאלה זו", "", {
              duration: 4000,
            });
          else {
            this._snackBar.open("הפעולה התבצעה בהצלחה", "", {
              duration: 4000,
            });
            this.disabledQ = true;
          }
        })
      }
      else this.CommentQFill = 'אנא מלא את תוכן ההערה';
    }
  }

  // post comment to the curremt answer
  postComment(answer: FullUserAnswer) {
    this.errPostCommentQ = '';
    this.errPostCommentA = '';
    this.CommentFill = '';
    if (this.userEnter == null)
      this.route.navigate(['LoginGuest/addComment'])
    else {
      this.inputValue = (<HTMLInputElement>document.getElementById((answer.userAnswer.Answer.AnswerId).toString() + "Text")).value;
      if (this.inputValue != null && this.inputValue != '') {
        this.commetToAnswer = new CommentAnswer(this.userEnter.UserId, this.inputValue, answer.userAnswer.Answer.AnswerId, new Date(), answer.userAnswer.Answer.AnswerContant, new Date(), '');
        this.answerService.PostCommentAnswer(this.commetToAnswer).subscribe(x => {
          if (x == null) {
            this._snackBar.open("הפעולה נכשלה, בדוק האם כבר הערת על תשובה זו", "", {
              duration: 4000,
            });
          }
          else {
            this._snackBar.open("הפעולה התבצעה בהצלחה", "", {
              duration: 4000,
            });
            this.disabledA = true;
          }
        });
      }
      else
        this.CommentFill = "אנא מלא את תוכן ההערה";
    }
  }

  ngOnInit(): void {
    this.askQuestion = false;
    this.disabledA = false;
    this.disabledQ = false
    this.userEnter = JSON.parse(sessionStorage.getItem("CurrentUser"));
    this.IfScoringNull = false;
    this.IfInputAble = false;
    this.teacherEnter = JSON.parse(sessionStorage.getItem("CurrentUser"));
    this.router.paramMap.subscribe(res => {
      this.Answerservice.GetAnswerById(Number((res.get("id")))).subscribe(x => {
        this.answer = x;
        this.questionService.GetQuestionById(x.userAnswer.Answer.QuestionId).subscribe(q => { this.questionForAnswer = q });
      })
    })
  }

}
