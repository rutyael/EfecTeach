import { Injectable } from '@angular/core';
import { AnswerAndOpinionToUser } from './AnswerAndOpinionToUser.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { questionAndAnswersToUser } from './questionAndAnswersToUser.model';
import { UserQuestion } from '../Question/user-question.model';
import { teacherJoinSchools_Result } from './teacherJoinSchools_Result.model';
import { School } from '../School/School.model';
import { TeachersAndSecretaryToSchool } from './TeachersAndSecretaryToSchool.model';
import { GetSchoolToStudent } from './GetSchoolToStudent.model';
import { GetCommentQA } from './GetCommentQA.model';
import { StudentProffestionLevel } from '../Proffestion/StudentProffestionLevel.model';

@Injectable({
  providedIn: 'root'
})
export class PersonalAreaServiceService {

  constructor(private http: HttpClient) { }
  commentQOrA: string;

  AnswerAndOpinionUser(idUser: number): Observable<AnswerAndOpinionToUser> {
    return this.http.get<AnswerAndOpinionToUser>(`http://localhost:51944/api/PersonalArea?idUserToOpinion=${idUser}`);
  }
  AnswersToUser(idUser: number): Observable<questionAndAnswersToUser> {
    return this.http.get<questionAndAnswersToUser>(`http://localhost:51944/api/PersonalArea?idUserToAnswers=${idUser}`);
  }
  ClassesAndUsersToUser(idUser: number): Observable<teacherJoinSchools_Result> {
    return this.http.get<teacherJoinSchools_Result>(`http://localhost:51944/api/PersonalArea?idUserToClass=${idUser}`);
  }
  QuestionsUserAsked(idUser: number): Observable<UserQuestion[]> {
    return this.http.get<UserQuestion[]>(`http://localhost:51944/api/PersonalArea?idUserToQuestion=${idUser}`);
  }
  GetTeachersAndSecretaryToSchool(): Observable<TeachersAndSecretaryToSchool[]> {
    return this.http.get<TeachersAndSecretaryToSchool[]>(`http://localhost:51944/api/PersonalArea`);
  }
  GetSchoolToStudent(idstudent: number): Observable<GetSchoolToStudent> {
    return this.http.get<GetSchoolToStudent>(`http://localhost:51944/api/PersonalArea?idStudent=${idstudent}`);
  }
  GetCommentQAtoUser(idUser: number): Observable<GetCommentQA> {
    debugger
    return this.http.get<GetCommentQA>(`http://localhost:51944/api/Answer?idUser=${idUser}`);
  }
  GetIfCommentQA(QA: string) {
    this.commentQOrA = QA;
  }
  GetMarksToStudent(StudentId: number): Observable<StudentProffestionLevel[]> {
    debugger
    return this.http.get<StudentProffestionLevel[]>(`http://localhost:51944/api/Proffestion?StudentId=${StudentId}`)
  }
}