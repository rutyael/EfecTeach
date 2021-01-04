import { Component, OnInit, ViewChild } from '@angular/core';
import { UserQuestion } from '../user-question.model';
import { QuestionServiceService } from '../question-service.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/User/user.service';
import { User } from 'src/app/User/user.model';
import { OrderbyPipe } from '../../orderby.pipe'
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {


  constructor(private userService: UserService, private QuestionService: QuestionServiceService, private router: Router) { }
  pageNo: number;
  AllUserQuestion: UserQuestion[] = [];
  arrToUserQuestion: UserQuestion[] = [];
  arrUserQuestion: UserQuestion[] = [];
  UserEnter: User;
  IfUserTeacher: Boolean;
  panelOpenState = false;
  SelectNoAnswer = new FormControl(false);
  DataSort: string = null;
  IfSortByNumQuestioners: boolean = false;
  appLaunch: boolean;
  NumNextIn: number;
  sliceFrom: number;
  NumCallToQuestion: number;
  ifFinishedQuestions: boolean;
  disableNext: boolean;
  numQuestionsInDB: number;
  userStatus: string;
  ifTeacherActive: boolean;
  ifStudentActive: boolean;
  UserId: number;
  GetQuestions: boolean;
  noAnswerLoading: boolean;
  checkedNews: boolean;
  checkedProffestion: boolean;
  checkedAsks: boolean;
  checkedClass: boolean;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  // sort by date
  SortByDate(FirstList: UserQuestion[], SecondList: UserQuestion[]): UserQuestion[] {
    var SortedFirstList: UserQuestion[];
    var SortedSecondList: UserQuestion[];
    if (FirstList.length == 0 || FirstList.length == 1)
      SortedFirstList = FirstList;
    else SortedFirstList = FirstList.sort((q1, q2) => {
      if (q1.QuestionDate > q2.QuestionDate)
        return -1;
      else if (q1.QuestionDate < q2.QuestionDate)
        return 1;
      else return 0;
    }
    )
    if (SecondList.length == 0 || SecondList.length == 1)
      SortedSecondList = SecondList;
    else SortedSecondList = SecondList.sort((q1, q2) => {
      if (q1.QuestionDate > q2.QuestionDate)
        return -1;
      else if (q1.QuestionDate < q2.QuestionDate)
        return 1;
      else return 0;
    })
    return (SortedFirstList.concat(SortedSecondList));
  }

  // check select sort user
  CheckedSort() {
    if (this.QuestionService.sortOption == "newsQuestion") {
      this.checkedNews = true;
      this.checkedProffestion = false;
    }
    else if (this.QuestionService.sortOption == "ByLanguage") {
      this.checkedProffestion = true;
      this.checkedNews = false;
    }
    else if (this.QuestionService.sortOption == "ByYourClasses")
      this.checkedClass = true;
    else if (this.QuestionService.sortOption == "ByAsks")
      this.checkedAsks = true;
    else if (this.QuestionService.sortOption == "ByYourFriends")
      this.checkedClass = true;
  }

  // Sort and filter the list of questions
  GetQuestionsBYFilter(numCallToQuestion: number, Back: string, ifClickButton: string, ifLoading: boolean) {
    this.GetQuestions = true;
    if (ifLoading == false) {
      this.QuestionService.sortOption = this.DataSort;
      this.QuestionService.noAnswersOption = this.SelectNoAnswer.value;
    }
    if (ifClickButton == "clicked" && ifLoading == false) {
      this.paginator.pageIndex = 0;
      this.NumCallToQuestion = 0;
    }
    this.AllUserQuestion.length = 0;
    this.arrToUserQuestion.length = 0;
    this.arrUserQuestion.length = 0;
    this.IfSortByNumQuestioners = false;
    this.NumNextIn = 0;
    this.sliceFrom = 0;
    if (Back == "Back") {
      this.NumNextIn = 2;
      this.sliceFrom = this.NumNextIn * 5;
    }
    if (ifLoading == true) {
      debugger
      if (this.QuestionService.noAnswersOption == true)
        this.noAnswerLoading = true;
      this.CheckedSort();
    }
    this.QuestionService.Sort(this.userStatus, this.UserId, this.QuestionService.sortOption, this.QuestionService.noAnswersOption, numCallToQuestion, '').subscribe(x => {
      console.log(x);
      this.GetQuestions = false;
      this.AllUserQuestion = x.QuestionsDefalt;
      this.numQuestionsInDB = x.NumQuestions;
      if (Back == "Back" && x.QuestionsDefalt.length < 15) {
        if (x.QuestionsDefalt.length < 5) {
          this.NumNextIn = 0;
          this.sliceFrom = 0;
        }
        else if (Back == "Back") {
          if (x.QuestionsDefalt.length % 5 != 0)
            this.NumNextIn = x.QuestionsDefalt.length / 5;
          else {
            this.NumNextIn = x.QuestionsDefalt.length / 5 - 1;
          }
          this.sliceFrom = this.NumNextIn * 5;
        }
      }
      this.arrToUserQuestion = this.AllUserQuestion.slice(this.sliceFrom, this.sliceFrom + 5);
    })
    if (this.QuestionService.sortOption == "ByAsks") {
      this.IfSortByNumQuestioners = true;
    }
  }

  // Click Next or Back
  NextPage(event: any) {
    // לחיצה על הבא 
    if (event.pageIndex > event.previousPageIndex) {
      this.NumNextIn = this.NumNextIn + 1;
      this.sliceFrom = this.NumNextIn * 5;
      if (this.sliceFrom > this.AllUserQuestion.length || this.sliceFrom == this.AllUserQuestion.length) {
        this.NumCallToQuestion = this.NumCallToQuestion + 15;
        this.GetQuestionsBYFilter(this.NumCallToQuestion, "", "", false);
      }
      else this.arrToUserQuestion = this.AllUserQuestion.slice(this.sliceFrom, this.sliceFrom + 5);
    }
    // לחיצה על אחורה
    else {
      this.NumNextIn = this.NumNextIn - 1;
      this.sliceFrom = this.NumNextIn * 5;
      if (this.NumNextIn < 0) {
        this.NumCallToQuestion = this.NumCallToQuestion - 15;
        this.GetQuestionsBYFilter(this.NumCallToQuestion, "Back", "", false);
      }
      else this.arrToUserQuestion = this.AllUserQuestion.slice(this.sliceFrom, this.sliceFrom + 5);
    }
  }

  // Filter routing
  ChangeSort(value: string) {
    this.appLaunch = true;
    this.DataSort = value;
  }

  // Link View students' answers
  GoToAnswersStudents() {
    this.appLaunch = true;
    this.router.navigate(['teacherWatchesAnswersStudent']);
  }

  ngOnInit(): void {
    this.noAnswerLoading = false;
    this.GetQuestions = true;
    this.pageNo = 0;
    this.NumCallToQuestion = 0;
    this.sliceFrom = 0;
    this.NumNextIn = 0;
    this.disableNext = false;
    this.appLaunch = false;
    this.ifFinishedQuestions = false;
    this.UserEnter = JSON.parse(sessionStorage.getItem("CurrentUser"));
    if (this.UserEnter == null) {
      this.UserId = -1;
      this.checkedNews = true;
      if (this.QuestionService.sortOption != null || this.QuestionService.noAnswersOption != null)
        this.GetQuestionsBYFilter(0, '', "clicked", true);
      else {
        this.QuestionService.GetAllQuestionDefalt(0).subscribe(x => {
          debugger
          if (x.QuestionsDefalt.length == 0)
            this.ifFinishedQuestions = true;
          this.GetQuestions = false;
          this.AllUserQuestion = x.QuestionsDefalt;
          this.numQuestionsInDB = x.NumQuestions;
          this.arrToUserQuestion = this.AllUserQuestion.slice(0, 5);
        })
      }
    }
    else {
      this.checkedProffestion = true;
      debugger
      if (sessionStorage.getItem("stat") == 'T' && this.UserEnter.Active == 1) {
        this.IfUserTeacher = true;
        this.ifTeacherActive = true;
      }
      else if (sessionStorage.getItem("stat") == 'S' && this.UserEnter.Active == 1) {
        this.IfUserTeacher = false;
        this.ifStudentActive = true;
      }
      else if (sessionStorage.getItem("stat") == 'T' && this.UserEnter.Active == 0) {
        this.IfUserTeacher = true;
        this.ifTeacherActive = false;
      }
      else if (sessionStorage.getItem("stat") == 'S' && this.UserEnter.Active == 0) {
        this.IfUserTeacher = false;
        this.ifStudentActive = false;
      }
      this.UserId = this.UserEnter.UserId;
      if (sessionStorage.getItem("stat") == 'T') {
        this.userStatus = "teacher";
      }
      else if (sessionStorage.getItem("stat") == 'S') {
        this.userStatus = "student";
      }
      else if (sessionStorage.getItem("stat") == 'O') {
        this.userStatus = "other";
      }
      if (this.QuestionService.sortOption != null || this.QuestionService.noAnswersOption != null)
        this.GetQuestionsBYFilter(0, '', "clicked", true);
      else {
        this.QuestionService.Sort(this.userStatus, this.UserId, 'ByLanguage', false, 0, "").subscribe(x => {
          debugger
          if (x.QuestionsDefalt.length == 0)
            this.ifFinishedQuestions = true;
          this.GetQuestions = false;
          this.AllUserQuestion = x.QuestionsDefalt;
          this.numQuestionsInDB = x.NumQuestions;
          this.arrToUserQuestion = this.AllUserQuestion.slice(0, 5);
          console.log(this.AllUserQuestion);
          console.log(this.arrToUserQuestion);
          if (this.IfUserTeacher == true)
            this.userStatus = "teacher";
          else this.userStatus = "student";
        })
      }

    }

  }

}
