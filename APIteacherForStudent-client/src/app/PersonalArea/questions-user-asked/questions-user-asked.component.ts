import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/User/user.model';
import { Secretary } from 'src/app/User/Secretary.model';
import { PersonalAreaServiceService } from '../personal-area-service.service';
import { UserService } from 'src/app/User/user.service';
import { UserQuestion } from 'src/app/Question/user-question.model';

@Component({
  selector: 'app-questions-user-asked',
  templateUrl: './questions-user-asked.component.html',
  styleUrls: ['./questions-user-asked.component.css']
})

export class QuestionsUserAskedComponent implements OnInit {

  constructor(private PersonalAreaService: PersonalAreaServiceService, private userService: UserService) { }
  AllQuestions: UserQuestion[] = [];
  displayedColumns: string[];
  userEnter: User = null;
  secretaryEnter: Secretary = null;
  whoami: string;
  dataSource = null;
  ifEmpty: boolean = false;

  // if question content is two long
  ifQuestionLong(question: string) {
    if (question.length > 10) {
      return question.slice(0, 10) + '...';
    }
    else return question;
  }

  // group by current list
  GroupBy(list, key) {
    return list.reduce(function (groupclasses, item) {
      (
        groupclasses[item[key]] = groupclasses[item[key]] || []).push(item);
      return groupclasses;
    }, {});
  }

  // get user id
  GetUserId() {
    if (this.userEnter != null)
      return this.userEnter.UserId;
    else return this.secretaryEnter.SecretaryId;
  }

  ngOnInit(): void {
    this.displayedColumns = ['QuestionTitle', 'QuestionDate', 'ProffestionName', 'QuestionView', 'NumQuestioners'];
    if (sessionStorage.getItem("stat") == 'SE') {
      this.secretaryEnter = JSON.parse(sessionStorage.getItem("CurrentUser"));
      this.whoami = "secretary";
    }
    else {
      this.userEnter = JSON.parse(sessionStorage.getItem("CurrentUser"));
      this.whoami = "user";
    }
    this.PersonalAreaService.QuestionsUserAsked(this.GetUserId()).subscribe(x => {
      if (x.length == 0)
        this.ifEmpty = true;
      this.AllQuestions = x;
      this.dataSource = this.AllQuestions;
    })
  }

}
