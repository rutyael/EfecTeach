import { Component, OnInit, Input } from '@angular/core';
import { CommentAnswer } from '../CommentAnswer.model';
import { UserService } from 'src/app/User/user.service';
import { User } from 'src/app/User/user.model';
import { UserAnswer } from '../user-answer.model';
import { AnswerServiceService } from '../answer-service.service';
import { Router } from '@angular/router';
import { FullUserAnswer } from '../FullUserAnswer.model';
import { MatSnackBar  } from '@angular/material/snack-bar';


@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css','../../edit-content.css']
})
export class AnswersComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar,private route: Router, private userService: UserService, private answerService: AnswerServiceService) { }
  @Input("allAnswers") answers;
  numAnswers: number;
  panelOpenState = false;
  commetToAnswer: CommentAnswer;
  userEnter: User;
  ifPost: boolean;
  inputValue: string = null;
  CommentFill: string;
  errPostComment:string;

  // post comment to the comment table
  postComment(answer: FullUserAnswer) {
    this.errPostComment='';
    this.CommentFill = '';
    if (this.userEnter == null)
      this.route.navigate(['LoginGuest/addComment'])
    else {
      this.inputValue = (<HTMLInputElement>document.getElementById((answer.userAnswer.Answer.AnswerId).toString() + "Text")).value;
      if (this.inputValue != null && this.inputValue != '') {
        this.commetToAnswer = new CommentAnswer(this.userEnter.UserId, this.inputValue, answer.userAnswer.Answer.AnswerId, new Date(), answer.userAnswer.Answer.AnswerContant, new Date(), '');
        this.answerService.PostCommentAnswer(this.commetToAnswer).subscribe(x => {
          if (x != null) {
            this._snackBar.open("הפעולה התבצעה בהצלחה", "", {
              duration: 4000,
            });
            document.getElementById("ans" + (answer.userAnswer.Answer.AnswerId).toString()).setAttribute('disabled', 'disabled');
            (document.getElementById((answer.userAnswer.Answer.AnswerId).toString() + "Text") as HTMLTextAreaElement).value = '';        
            this.ifPost = true;
          }
          else {
            this._snackBar.open("הפעולה נכשלה, בדוק האם כבר הערת על תשובה זו", "", {
              duration: 4000,
            });
          }
        });
      }
      else
        this.CommentFill = "אנא מלא את תוכן ההערה";
    }
  }

  ngOnInit(): void {
    this.userEnter = JSON.parse(sessionStorage.getItem("CurrentUser"));
  }

}
