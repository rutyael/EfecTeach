import { Component, OnInit } from '@angular/core';
import { UserQuestion } from '../user-question.model';
import { QuestionServiceService } from '../question-service.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { User } from 'src/app/User/user.model';
import { UserService } from 'src/app/User/user.service';
import { FormControl, Validators } from '@angular/forms';
import { Proffestion } from 'src/app/Proffestion/proffestion.model';
import { ProffestionService } from 'src/app/Proffestion/proffestion.service';
import { QuestionSearch } from '../QuestionSearch.model';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css']
})
export class AskQuestionComponent implements OnInit {

  constructor(private ProffestionService: ProffestionService, private router: Router, private QuestionService: QuestionServiceService, private userService: UserService) { }

  QuestionsSearch: QuestionSearch[];
  arrSearchToUser: QuestionSearch[];
  numQuestions: number = 0;
  pageNo: number;
  NumNextIn: number;
  sliceFrom: number;
  questionToSearch: string;
  userEnter: User = null;
  LanguagesControl: FormControl;
  ProffestionsArry: Proffestion[] = [];
  ifProffestion: boolean = false;
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  noAnswerSearch: string = '';
  errorRequeridLanguage: boolean;
  GetResult: boolean;

  // if content question is two long
  Content(content: string) {
    var element = document.createElement('span');
    element.innerHTML = content;
    var element_content = element.innerText;
    element_content = element_content.slice(0, 100);
    element_content=element_content.concat('...');
    element.innerText = element_content;
    return element.innerHTML;
  }

  // sort the question by the level
  SortByLevel(QuestionList: QuestionSearch[]): QuestionSearch[] {
    var SortedList: QuestionSearch[];
    if (QuestionList.length == 1)
      SortedList = QuestionList;
    else SortedList = QuestionList.sort((q1, q2) => {
      if (q1.level > q2.level)
        return -1;
      else if (q1.level < q2.level)
        return 1;
      else return 0;
    }
    )
    return SortedList;
  }

  // Search for questions that match the user's search
  GetStrSearching(str) {
    str = str.replace(/#/g, '%23');
    str = str.replace(/&/g, '%26');
    str = str.replace(/'/g, '%27');
    return str;
  }
  // Search for questions that match the user's search
  SearchCurrentQuestions() {
    this.noAnswerSearch = '';
    var str_searching = this.GetStrSearching(this.questionToSearch);
    if (this.isValid(this.LanguagesControl.value) == true && this.LanguagesControl.value != null && this.LanguagesControl.value != '') {
      this.GetSearchResults(str_searching, this.LanguagesControl.value)
      sessionStorage.setItem("SearchQuestion", JSON.stringify({ string: this.questionToSearch, lang: this.LanguagesControl.value }));
    }
    else this.errorRequeridLanguage = true;
  }
  // search 
  GetSearchResults(question, lang) {
    this.QuestionService.SearchCurrentQuestions(question, lang).subscribe(x => {
      this.errorRequeridLanguage=false;
      if (x == null)
        this.noAnswerSearch = "מצטערים, לא נמצאו תוצאות מתאימות לחיפוש שלך";
      else if (x.length == 0)
        this.noAnswerSearch = "מצטערים, לא נמצאו תוצאות מתאימות לחיפוש שלך";
      else {
        this.numQuestions = x.length;
        this.QuestionsSearch = this.SortByLevel(x);
        this.NumNextIn = 0;
        this.sliceFrom = 0;
        this.arrSearchToUser = this.QuestionsSearch.slice(this.sliceFrom, this.sliceFrom + 5);
      }
    })
  }

  // if error language 
  ifErrorLanguagesControl() {
    if (this.LanguagesControl.value == "")
      this.errorRequeridLanguage = true;
    console.log(this.LanguagesControl.value);
  }

  ToPostQuestion() {
    if (this.userEnter == null)
      this.router.navigate(['LoginGuest/AddQuestion'])
    else {
      this.QuestionService.questionTitleToAdd = this.questionToSearch;
      this.QuestionService.questionProffestionToAdd = this.LanguagesControl.value;
      this.router.navigate(['addQuestion']);
    }
  }

  // Click Next or Back
  NextPage(event: any) {
    // לחיצה על הבא 
    if (event.pageIndex > event.previousPageIndex) {
      this.NumNextIn = this.NumNextIn + 1;
      this.sliceFrom = this.NumNextIn * 5;
    }
    // לחיצה על אחורה
    else {
      this.NumNextIn = this.NumNextIn - 1;
      this.sliceFrom = this.NumNextIn * 5;
    }
    this.arrSearchToUser = this.QuestionsSearch.slice(this.sliceFrom, this.sliceFrom + 5);
  }

  // if proffestion is valid
  isValid(lang: string) {
    if (lang != '')
      return (this.ProffestionsArry.find(p => p.ProffestionName == lang) != null);
    else return true;
  }

  ngOnInit(): void {
    this.errorRequeridLanguage = false;
    this.ifProffestion = false;
    this.sliceFrom = 0;
    this.NumNextIn = 0;
    this.pageNo = 0;
    this.userEnter = JSON.parse(sessionStorage.getItem("CurrentUser"));
    this.LanguagesControl = new FormControl('', [Validators.required]);
    this.ProffestionService.GetAll().subscribe(pro => {
      this.ifProffestion = true;
      this.ProffestionsArry = pro;
      var prev_q;
      if ((prev_q = JSON.parse(sessionStorage.getItem("SearchQuestion"))).lang != -1) {
        this.LanguagesControl.setValue(prev_q.lang);
        this.questionToSearch = prev_q.string;
        this.GetSearchResults(this.GetStrSearching(prev_q.string), prev_q.lang);
      }
    });
  }

}
