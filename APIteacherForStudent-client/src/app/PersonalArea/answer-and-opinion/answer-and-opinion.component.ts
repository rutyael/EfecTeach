import { Component, OnInit } from '@angular/core';
import { PersonalAreaServiceService } from '../personal-area-service.service';
import { AnswerAndOpinionToUser } from '../AnswerAndOpinionToUser.model';
import { User } from 'src/app/User/user.model';
import { Secretary } from 'src/app/User/Secretary.model';
import { UserService } from 'src/app/User/user.service';

@Component({
  selector: 'app-answer-and-opinion',
  templateUrl: './answer-and-opinion.component.html',
  styleUrls: ['./answer-and-opinion.component.css']
})
export class AnswerAndOpinionComponent implements OnInit {

  constructor(private userService: UserService, private PersonalAreaService: PersonalAreaServiceService) { }
  userEnter: User = null;
  secretaryEnter: Secretary = null;
  whoami: string;
  AllanswerAndOpinion: AnswerAndOpinionToUser;
  answerAndOpinion = {};
  displayedColumns: string[];
  ProffestionName: string;
  answerDate: Date;
  ifEmpty:boolean=false;

// group by list classes
  GroupBy(list, key) {
    return list.reduce(function (groupclasses, item) {
      (
        groupclasses[item[key]] = groupclasses[item[key]] || []).push(item);
      return groupclasses;
    }, {});
  }

  // if comment is null
  ifCommentNull(comment: string) {
    if (comment == null)
      return '____';
    else if (comment.length > 6) {
      return comment.slice(0, 6) + '...';
    }
    else return comment;
  }

  // get user id
  GetUserId() {
    if (this.userEnter != null)
      return this.userEnter.UserId;
    else return this.secretaryEnter.SecretaryId;
  }

  // get answer details
  GetAnswerDetail(answerId: number): string {
    this.AllanswerAndOpinion.userAnswers.forEach(x => {
      if (x.Answer.AnswerId == answerId) {
        this.ProffestionName = x.ProffestionName;
        this.answerDate = x.Answer.AnswerDate;
      }
    })
    return null;
  }

  ngOnInit(): void {
    this.displayedColumns = ['scoring', 'feedback', 'comment', 'teacherName', 'teacherMail'];
    if (sessionStorage.getItem("stat") == 'SE') {
      this.secretaryEnter = JSON.parse(sessionStorage.getItem("CurrentUser"));
      this.whoami = "secretary";
    }
    else {
      this.userEnter = JSON.parse(sessionStorage.getItem("CurrentUser"));
      this.whoami = "user";
    }
    this.PersonalAreaService.AnswerAndOpinionUser(this.GetUserId()).subscribe(x => {
      if (x.opinionAnswers.length==0)
        this.ifEmpty = true;
      this.AllanswerAndOpinion = x;
      this.answerAndOpinion = this.GroupBy(x.opinionAnswers, "AnswerId");
    })

  }

}
