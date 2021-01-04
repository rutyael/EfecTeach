import { Component, OnInit } from '@angular/core';
import { UserService } from '../../User/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/User/user.model';
import { Secretary } from 'src/app/User/Secretary.model';
import { environment } from 'src/environments/environment';
import { QuestionServiceService } from 'src/app/Question/question-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  log: string;
  userEnter: User = null;
  SecretaryEnter: Secretary = null;
  Loading: boolean = true;

  constructor(private userService: UserService, private router: Router, private QuestionService: QuestionServiceService
  ) { }

  // if display menu
  IfDisplayMenu(): Boolean {
    if (this.router.url == "/About" || this.router.url == "/signIn" || this.router.url == "/signUp" || this.router.url == "/" || this.router.url == "/forgotPassword")
      return false;
    else {
      return true;
    }
  }
  IfDisabledSecretary() {
    if (sessionStorage.getItem("CurrentSchool")==null||sessionStorage.getItem("CurrentSchool")=='') {
      return true;
    }
    else return false;
  }
  IfDisplayMenuUser() {
    if (this.router.url == "/signIn" || this.router.url == "/signUp" || this.router.url == "/forgotPassword")
      return false;
    if (this.userEnter != null || this.SecretaryEnter != null)
      return true;

  }
  // if user is secretary
  IsUserSecretary(): Boolean {
    if (this.SecretaryEnter != null)
      return true;
    else if (this.userEnter != null)
      return false;
    else return null;
  }

  // if user is teacher
  IsUserTeacher(): Boolean {
    if (this.router.url == "/questions")
      return true;
    else return false;
  }

  // exit
  Exit() {
    sessionStorage.setItem("CurrentUser", null);
    sessionStorage.setItem("stat", "D");
    this.router.navigate(['/']);
    this.userEnter = null;
    this.SecretaryEnter = null;
  }

  ToHomePage() {
    this.router.navigate(['/']);
  }
  RelativeSe(url: string) {
    this.router.navigate([`school/${JSON.parse(sessionStorage.getItem("CurrentSchool")).idSchool}/${url}`]);
  }
  // return status user
  Whoami(): string {
    sessionStorage.getItem("stat") == 'SE' ? this.SecretaryEnter = JSON.parse(sessionStorage.getItem("CurrentUser")) :
      this.userEnter = JSON.parse(sessionStorage.getItem("CurrentUser"));
    switch (sessionStorage.getItem("stat")) {
      case 'SE': {
        return "secretary";
      } break;
      case 'S': return this.userEnter.Active == 1 ? "student" : "other"; break;
      case 'T': return this.userEnter.Active == 1 ? "teacher" : "other"; break;
      case 'O': return "other"; break;
      case 'D': return null;
    }
  }

  // go to the list questions
  ToListQuestions() {
    this.router.navigate(['questions']);
  }

  // go to the ask question
  ToAskQuestion() {
    this.QuestionService.ResetSearchQuestion();
    this.router.navigate(['reload']);
    setTimeout(() => this.router.navigate(['AskQuestion']));
  }

  // go to the personal area
  ToPersonal() {
    if (this.Whoami() == null)
      this.router.navigate(['/LoginGuest/PersonalArea']);
    else if (this.Whoami() == 'secretary')
      this.router.navigate([`/school/${this.SecretaryEnter.SchoolId}/UpdateDetailsSecretary`]);
    else if (this.userEnter != null)
      this.router.navigate(['/PersonalArea']);
  }

  ngOnInit(): void {
    this.SecretaryEnter = null;
    this.userEnter = null;
    sessionStorage.getItem("stat") == 'SE' ? this.SecretaryEnter = JSON.parse(sessionStorage.getItem("CurrentUser")) :
      this.userEnter = JSON.parse(sessionStorage.getItem("CurrentUser"));
    this.Loading = false;
  }

}
