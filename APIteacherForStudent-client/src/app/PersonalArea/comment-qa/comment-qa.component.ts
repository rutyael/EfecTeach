import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { PersonalAreaServiceService } from '../personal-area-service.service';
import { GetCommentQA } from '../GetCommentQA.model';
import { UserService } from 'src/app/User/user.service';
import { User } from 'src/app/User/user.model';
import { CommentAnswer } from 'src/app/Answer/CommentAnswer.model';
import { CommentQuestion } from 'src/app/Question/CommentQuestion.model';

@Component({
  selector: 'app-comment-qa',
  templateUrl: './comment-qa.component.html',
  styleUrls: ['./comment-qa.component.css']
})
export class CommentQAComponent implements OnInit {

  constructor(private PersonalArea: PersonalAreaServiceService, private UserService: UserService) { }
  commentAnswers: CommentAnswer[];
  commentQuestions: CommentQuestion[];
  getCommentQA: GetCommentQA;
  userEnter: User;
  panelOpenState: boolean;
  displayedColumns: string[];
  AnsOrQue: string;
  dataSource:CommentAnswer[];
  comments: any[];
  users: User[];
  user: User;
  loading: boolean;
  ifEmptyComments: boolean = false;
  EmptyComment: string;

  // if there are comment to user
  IfCommentQA() {
    this.ifEmptyComments = false;
    this.AnsOrQue = this.PersonalArea.commentQOrA;
    if (this.AnsOrQue == 'A' &&this.getCommentQA!=undefined&& this.getCommentQA.CommentAnswers != undefined) {
      this.loading = true;
      this.comments = this.getCommentQA.CommentAnswers;
      this.users = this.getCommentQA.CommentAnswersUser;
    }
    else {
      if (this.AnsOrQue == 'Q' &&this.getCommentQA!=undefined&& this.getCommentQA.CommentQuestions != undefined) {
        this.loading = true;
        this.comments = this.getCommentQA.CommentQuestions;
        this.users = this.getCommentQA.CommentQuestionsUser;
      }
    }
    this.dataSource = this.comments;
    if (this.comments != undefined && this.comments.length == 0) {
      this.ifEmptyComments = true;
      this.EmptyComment = "לא נמצאו הערות מתאימות";
    }
  }

  // if comment is two long
  ifCommentLong(comment:string){
    if (comment.length > 10) {
      return comment.slice(0,10)+'...';
    }
    else return comment;
  }

  // get user name by id
  GetUserNameById(id: number) {
    this.users.forEach(x => {
      if (x.UserId == id)
        this.user = x;
    })
    return this.user.UserName;
  }

  // get user kind by id
  GetUserKindById(id: number) {
    this.users.forEach(x => {
      if (x.UserId == id)
        this.user = x;
    })
    return this.user.UserKind;
  }

  ngOnInit(): void {
    this.dataSource = [];
    this.ifEmptyComments = false;
    this.loading = false;
    this.panelOpenState = false;
    this.userEnter = JSON.parse(sessionStorage.getItem("CurrentUser"));
    this.PersonalArea.GetCommentQAtoUser(this.userEnter.UserId).subscribe(x => {
      this.getCommentQA = x;
    })
  }
}
