import { Injectable } from '@angular/core';
import { Answer } from './answer.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAnswer } from './user-answer.model';
import { AnswerAndClassesToTeacher } from './AnswerAndClassesToTeacher.model';
import { answerOpinion } from './answerOpinion.model';
import { UserQuestion } from '../Question/user-question.model';
import { CommentAnswer } from './CommentAnswer.model';
import { FullUserAnswer } from './FullUserAnswer.model';

@Injectable({
  providedIn: 'root'
})
export class AnswerServiceService {

  constructor(private http: HttpClient) { }

  AnswersStudentToTeacher: FullUserAnswer[] = [];
  answersToQuestions: UserAnswer[] = [];
  DataSort: any=null;
  DataSortClasses: any[] = [];

  // Post answer to the answer table
  PostAnswer(answer: Answer): Observable<any> {
    return this.http.post(`http://localhost:51944/api/Answer`, answer);
  }
  AnswersToQuestions(id: number): Observable<FullUserAnswer[]> {
    return this.http.get<FullUserAnswer[]>(`http://localhost:51944/api/Answer?idQuestion=${id}`);
  }
  GetAnswersToQuestions(answers: FullUserAnswer[]) {
    this.AnswersStudentToTeacher = answers;
  }
  GetStudentQuestionAndClassesToTeacher(idTeacher: number): Observable<AnswerAndClassesToTeacher> {
    return this.http.get<AnswerAndClassesToTeacher>(`http://localhost:51944/api/Answer?ID=${idTeacher}`);
  }
  PostanswerOpinion(Answer: answerOpinion): Observable<any> {
    return this.http.post<any>(`http://localhost:51944/api/answerOpinion`, Answer)
  }
  GetAnswerById(idAnswer: number): Observable<FullUserAnswer> {
    return this.http.get<FullUserAnswer>(`http://localhost:51944/api/Answer?idAnswer=${idAnswer}`)
  }
  PostCommentAnswer(comment: CommentAnswer): Observable<CommentAnswer> {
    return this.http.post<CommentAnswer>(`http://localhost:51944/api/CommentAnswer`, comment);
  }

  GetCommentAnswerById(idAnswer:number):Observable<CommentAnswer[]>{
    return this.http.get<CommentAnswer[]>(`http://localhost:51944/api/CommentAnswer?idAnswer=${idAnswer}`);
  }

}
