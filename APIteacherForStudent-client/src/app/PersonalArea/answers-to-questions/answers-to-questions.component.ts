import { Component, OnInit } from '@angular/core';
import { PersonalAreaServiceService } from '../personal-area-service.service';
import { questionAndAnswersToUser } from '../questionAndAnswersToUser.model';
import { UserService } from 'src/app/User/user.service';
import { User } from 'src/app/User/user.model';
import { Secretary } from 'src/app/User/Secretary.model';
import { UserQuestion } from 'src/app/Question/user-question.model';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-answers-to-questions',
  templateUrl: './answers-to-questions.component.html',
  styleUrls: ['./answers-to-questions.component.css']
})
export class AnswersToQuestionsComponent implements OnInit {

  constructor(private router: ActivatedRoute, private PersonalAreaService: PersonalAreaServiceService, private userService: UserService) { }
  userEnter: User = null;
  ifEmpty: boolean = false;
  secretaryEnter: Secretary = null;
  whoami: string;
  questionsandAnswersUser: questionAndAnswersToUser;
  displayedColumns: string[];
  questionAndAnswers = {};
  QuestionTitle: string;
  ProffestionName: string;
  QuestionDate: Date;

  // get user id
  GetUserId() {
    return sessionStorage.getItem("stat") == 'SE' ? this.secretaryEnter.SecretaryId : this.userEnter.UserId;
  }

  // if content answer is two long
  ifAnswerLong(answer: string) {
    var element = document.createElement("span");
    element.innerHTML = answer;
    var element_content = element.innerText;
    element_content = element_content.slice(0, 40);
    return element_content + '...';
  }


  // get question by question id
  GetQuestionById(id: number): UserQuestion {
    this.questionsandAnswersUser.questions.forEach(x => {
      if (x.QuestionId == Number(id))
        this.QuestionTitle = x.OuestionTitle;
      this.ProffestionName = x.ProffestionName;
      this.QuestionDate = x.QuestionDate;
    })
    return null;
  }

  // group by list classes
  GroupBy(list, key) {
    return list.reduce(function (groupclasses, item) {
      (
        groupclasses[item.Answer[key]] = groupclasses[item.Answer[key]] || []).push(item);
      return groupclasses;
    }, {});
  }

  ngOnInit(): void {
    this.displayedColumns = ['answerContant', 'date', 'userName', 'userStatus', 'userMail'];
    if (sessionStorage.getItem("stat") == 'SE') {
      this.secretaryEnter = JSON.parse(sessionStorage.getItem("CurrentUser"));
      this.whoami = "secretary";
    }
    else {
      this.userEnter = JSON.parse(sessionStorage.getItem("CurrentUser"));
      this.whoami = "user";
    }
    this.PersonalAreaService.AnswersToUser(this.GetUserId()).subscribe(x => {
      if (x.answersToQuestions.length == 0)
        this.ifEmpty = true;
      this.questionsandAnswersUser = x;
      this.questionAndAnswers = this.GroupBy(x.answersToQuestions, "QuestionId")
    })
  }


}
