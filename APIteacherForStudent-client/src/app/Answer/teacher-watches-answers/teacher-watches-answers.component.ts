import { Component, OnInit, ViewChild } from '@angular/core';
import { UserAnswer } from '../user-answer.model';
import { AnswerServiceService } from '../answer-service.service';
import { User } from 'src/app/User/user.model';
import { UserService } from 'src/app/User/user.service';
import { classToSchool } from 'src/app/School/classToSchool.model';
import { FullUserAnswer } from '../FullUserAnswer.model';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-teacher-watches-answers',
  templateUrl: './teacher-watches-answers.component.html',
  styleUrls: ['./teacher-watches-answers.component.css']
})
export class TeacherWatchesAnswersComponent implements OnInit {

  constructor(private AnswerService: AnswerServiceService, private UserService: UserService) { }
  AllStudentQuestionToTeacher: FullUserAnswer[] = [];
  ClassesToSelectTeacher: {};
  AnswersToSelectClass: FullUserAnswer[] = [];
  AnswersToUser: FullUserAnswer[] = [];
  TeacherEnter: User;
  panelOpenState = false;
  DataSort: any;
  DataSortClasses: any[] = [];
  IfNoAnswers: boolean = false;
  pageNo: number;
  sliceFrom: number;
  numAnswers: number;
  NumNextIn: number;
  disableClasses: boolean;
  classesSelect: boolean;
  getAnswers: boolean;
  AnswersEmpty: boolean;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  // Fill in the class name for sorting
  ChangeSort(select: any) {
    if (select == "allClasses") {
      this.disableClasses = true;
      this.DataSort = select;
    }
    else {
      this.DataSort = "";
      let flag = 0;
      this.DataSortClasses.forEach(x => {
        if (x == select) {
          flag = 1;
          let newArr = this.DataSortClasses.filter(c => c != select);
          this.DataSortClasses = newArr;
        }
      })
      if (flag == 0)
        this.DataSortClasses.push(select);
    }
  }

  // Sort the list of answers by choice
  SortBySelect(ifLoading: boolean) {
    this.getAnswers=true;
    this.sliceFrom = 0;
    this.NumNextIn = 0;
    this.IfNoAnswers = false;
    this.paginator.pageIndex = 0;
    this.AnswersToSelectClass.length = 0;
    if (ifLoading == false) {
      this.AnswerService.DataSort = this.DataSort;
      this.AnswerService.DataSortClasses = this.DataSortClasses;
    }
    if (this.AnswerService.DataSort == undefined && ifLoading == false)
      this.AnswerService.DataSort = "allClasses";
    if (this.AnswerService.DataSort == "allClasses") {
      this.AllStudentQuestionToTeacher.forEach(x => this.AnswersToSelectClass.push(x));
    }

    else if (this.AnswerService.DataSort == "") {
      this.AllStudentQuestionToTeacher.forEach(x => {
        this.AnswerService.DataSortClasses.forEach(c => {
          if (x.userAnswer.idClass == c.id)
            this.AnswersToSelectClass.push(x);
        })
      })
      if (this.AnswersToSelectClass.length == 0)
        this.IfNoAnswers = true;
    }
    this.numAnswers = this.AnswersToSelectClass.length;
    this.getAnswers=false;
    this.AnswersToUser = this.AnswersToSelectClass.slice(0, 5);
  }

  // Click Next or Back
  NextPage(event: any) {
    // לחיצה על הבא 
    if (event.pageIndex > event.previousPageIndex) {
      this.NumNextIn = this.NumNextIn + 1;
      this.sliceFrom = this.NumNextIn * 5;
      this.AnswersToUser = this.AnswersToSelectClass.slice(this.sliceFrom, this.sliceFrom + 5);
    }
    // לחיצה על אחורה
    else {
      this.NumNextIn = this.NumNextIn - 1;
      this.sliceFrom = this.NumNextIn * 5;
      this.AnswersToUser = this.AnswersToSelectClass.slice(this.sliceFrom, this.sliceFrom + 5);
    }
  }

  // filter by classes selected
  FilterByClasses() {
    this.DataSort = "";
    if (this.classesSelect == true)
      this.disableClasses = false;
    else this.disableClasses = false;
  }

  // group by schools
  GroupBy(list, key) {
    return list.reduce(function (groupclasses, item) {
      (
        groupclasses[item[key]] = groupclasses[item[key]] || []).push(item);
      return groupclasses;
    }, {});
  }
  ngOnInit(): void {
    this.getAnswers = true;
    this.classesSelect = true;
    this.disableClasses = true;
    this.pageNo = 0;
    this.NumNextIn = 0;
    this.sliceFrom = 0;
    this.TeacherEnter = JSON.parse(sessionStorage.getItem("CurrentUser"));
    this.AnswerService.GetStudentQuestionAndClassesToTeacher(this.TeacherEnter.UserId).subscribe(x => {
      if (x.answers.length == 0)
        this.AnswersEmpty = true;
      else this.AnswersEmpty = false;
      this.getAnswers = false;
      this.AllStudentQuestionToTeacher = x.answers;
      this.numAnswers = x.answers.length;
      this.AllStudentQuestionToTeacher.forEach(x => this.AnswersToSelectClass.push(x));
      var newArrClasses = x.classes.map(function (val) {
        return {
          id: val.id,
          idSchool: val.idSchool,
          className: val.className,
          comment: val.comment,
          SchoolName: val.SchoolName,
          Proffestions: val.Proffestions,
          ifselect: false
        }
      })
      this.ClassesToSelectTeacher = this.GroupBy(newArrClasses, "SchoolName");
      this.AnswerService.GetAnswersToQuestions(x.answers);
      if (this.AnswerService.DataSort != null || this.AnswerService.DataSortClasses.length != 0)
        this.SortBySelect(true);
      else this.AnswersToUser = this.AnswersToSelectClass.slice(0, 5);
    })
  }
}
