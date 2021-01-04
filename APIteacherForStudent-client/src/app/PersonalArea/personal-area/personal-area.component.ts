import { Component, OnInit, AfterViewInit } from '@angular/core';
import { User } from 'src/app/User/user.model';
import { UserService } from 'src/app/User/user.service';
import { Secretary } from 'src/app/User/Secretary.model';
import { PersonalAreaServiceService } from '../personal-area-service.service';
import { GetCommentQA } from '../GetCommentQA.model';
import { CommentQuestion } from 'src/app/Question/CommentQuestion.model';
import { CommentAnswer } from 'src/app/Answer/CommentAnswer.model';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.css']
})
export class PersonalAreaComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    // console.log('afterViewInit => ', this.tabGroup.selectedIndex);
  }

  constructor(private userService: UserService, private router: Router, private PersonalAreaService: PersonalAreaServiceService) { }
  userEnter: User = null;
  secretaryEnter: Secretary = null;
  whoami: string;
  answerAndOpinion = {};
  questionAndAnswers = {};
  ClassAndUser = {};
  commentAnswer: CommentAnswer[];
  commentQuestion: CommentQuestion[];
  tabGroup: any;
  textLabel: string;
  schoolStudent: string;
  classStudent: string;


  // change tab comments
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    if (tabChangeEvent.tab.textLabel == "הערות על שאלות ששאלת")
      this.PersonalAreaService.GetIfCommentQA('Q');
    if (tabChangeEvent.tab.textLabel == "הערות על תשובות שענית")
      this.PersonalAreaService.GetIfCommentQA('A');
  }

  // get user name
  GetUserName() {
    if (this.userEnter != null)
      return this.userEnter.UserName;
    else return this.secretaryEnter.SecretaryName;
  }

  // get user status
  GetUserStatus() {
    if (this.userEnter != null) {
      if (this.userEnter.Active == 0)
        return "אחר";
      else return this.userEnter.UserKind;
    }
    else return "מזכיר";

  }

  // set school student
  SchoolStudent(schoolName: any) {
    this.schoolStudent = schoolName
  }
  
  // set class student
  ClassStudent(className: any) {
    this.classStudent = className;
  }

  ngOnInit(): void {
    debugger
    if (sessionStorage.getItem("stat") == 'SE') {
      this.secretaryEnter = JSON.parse(sessionStorage.getItem("CurrentUser"));
      this.whoami = "secretary";
    }
    else {
      this.userEnter = JSON.parse(sessionStorage.getItem("CurrentUser"));
      if (this.userEnter != null)
        this.whoami = "user";
      else this.router.navigate(['/LoginGuest/PersonalArea']);

    }
  }

}
