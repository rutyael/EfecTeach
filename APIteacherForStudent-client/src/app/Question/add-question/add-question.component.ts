import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/User/user.service';
import { User } from 'src/app/User/user.model';
import { Question } from '../question.model';
import { FormControl, Validators } from '@angular/forms';
import { ProffestionService } from 'src/app/Proffestion/proffestion.service';
import { Proffestion } from 'src/app/Proffestion/proffestion.model';
import { QuestionServiceService } from '../question-service.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar, private _location: Location, private UserService: UserService, private ProffestionService: ProffestionService, private QuestionService: QuestionServiceService, private router: Router) { }
  CurrentUser: User = null;
  TitleControl: FormControl;
  LanguagesControl: FormControl;
  ProffestionsArry: Proffestion[] = [];
  QuestionContent: string;
  questionTitle: string;
  proffestionQ: string;
  ContentRequrid: boolean = false;
  userEnter: User;
  disablePost:boolean


  // back
  backClicked() {
    this._location.back();
  }

  // get name proffestion
  getName(pro: Proffestion) {
    return pro.ProffestionName;
  }

  // set question content
  SetQuestion(txt: string) {
    this.QuestionContent = txt;
  }

  // post question
  PostQuestion() {
    this.ContentRequrid = false;
    if (this.QuestionContent != undefined) {
      if (this.TitleControl.valid && this.LanguagesControl.valid && this.isValid(this.LanguagesControl.value)) {
        var lang = this.ProffestionsArry.find(p => p.ProffestionName == this.LanguagesControl.value);
        var question: Question = new Question(0, this.TitleControl.value, this.QuestionContent, this.userEnter.UserId, lang.ProffestionId, new Date, 0, 1);
        this.QuestionService.PostQuestion(question).subscribe(x => {
          if (x == null)
            this._snackBar.open("הפעולה נכשלה, אנא נסה שוב", "", {
              duration: 4000,
            });
          else {
            this._snackBar.open("הפעולה התבצעה בהצלחה", "", {
              duration: 4000,
            });
            this.disablePost=true;
          }
        });
      }
    }
    else {
      this.ContentRequrid = true;
    }
  }

  // if proffestion is valid
  isValid(lang: string) {
    return this.ProffestionsArry.find(p => p.ProffestionName == lang) != null;
  }

  ngOnInit(): void {
    this.disablePost=false;
    this.userEnter = JSON.parse(sessionStorage.getItem("CurrentUser"));
    this.ContentRequrid = false;
    this.questionTitle = this.QuestionService.questionTitleToAdd;
    this.proffestionQ = this.QuestionService.questionProffestionToAdd;
    this.CurrentUser = JSON.parse(sessionStorage.getItem("CurrentUser"));
    this.ProffestionService.GetAll().subscribe(pro => {
      this.ProffestionsArry = pro;
    });
    this.TitleControl = new FormControl('', [Validators.required]);
    this.LanguagesControl = new FormControl('', [Validators.required]);
  }

}

