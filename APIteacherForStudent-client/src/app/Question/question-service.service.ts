import { Injectable } from '@angular/core';
import { UserQuestion } from '../Question/user-question.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import {OrderByPipe} from './orderby';
import { map } from 'rxjs/operators';
import { Question } from './question.model';
import { User } from '../User/user.model';
import { SortLists } from './SortLists.model';
import { QuestionsReturnDefalt } from './QuestionsReturnDefalt.model';
import { CommentQuestion } from './CommentQuestion.model';
import { QuestionSearch } from './QuestionSearch.model';
import { FullUserQuestion } from './FullUserQuestion.model';


@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {

  sortOption: string = null;
  noAnswersOption: boolean = null;
  ArrUserQuestionFilter: UserQuestion[] = [];
  questionTitleToAdd: string;
  questionProffestionToAdd: string;

  constructor(private http: HttpClient) { }
  ResetSearchQuestion() {
    sessionStorage.setItem("SearchQuestion", JSON.stringify({ string: '', lang: -1 }))
  }
  GetAllQuestionDefalt(i: number): Observable<QuestionsReturnDefalt> {
    return this.http.get<QuestionsReturnDefalt>(`http://localhost:51944/api/Question?index=${i}`);
  }

  GetQuestionById(id: number): Observable<FullUserQuestion> {
    return this.http.get<FullUserQuestion>(`http://localhost:51944/api/Question/` + id);
  }

  PutQuestion(questionPut: UserQuestion): Observable<any> {
    return this.http.put(`http://localhost:51944/api/Question`, questionPut);
  }

  PostQuestion(question: Question):Observable<Question> {
   return this.http.post<Question>('http://localhost:51944/api/Question', question);
  }
  Sort(Status: string, idUser: number, datasort: string, ifnoanswer: boolean, numcallToQuestion: number, back: string): Observable<QuestionsReturnDefalt> {
    debugger
    return this.http.get<QuestionsReturnDefalt>(`http://localhost:51944/api/Question?status=${Status}&idUser=${idUser}&dataSort=${datasort}&ifNoAnswer=${ifnoanswer}&numCallToQuestion=${numcallToQuestion}&Back=${back}`);
  }
  PostComment(comment: CommentQuestion): Observable<CommentQuestion> {
    debugger
    return this.http.post<CommentQuestion>(`http://localhost:51944/api/CommentQuestion`, comment);
  }

  SearchCurrentQuestions(questionSearch: string, questionLanguage: string): Observable<QuestionSearch[]> {
    debugger
    return this.http.get<QuestionSearch[]>(`http://localhost:51944/api/Question?searchQuestion=${questionSearch}&questionLanguage=${questionLanguage}`);
  }

  GetCommentQuestionById(idQuestion: number): Observable<CommentQuestion[]> {
    return this.http.get<CommentQuestion[]>(`http://localhost:51944/api/CommentQuestion?idQuestion=${idQuestion}`);
  }
}
