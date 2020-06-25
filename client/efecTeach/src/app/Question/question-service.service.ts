import { Injectable } from '@angular/core';
import { UserQuestion } from '../Question/user-question.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {
  
  arrUserQuestion:UserQuestion[]=[];

  constructor(private http:HttpClient) {
    this.arrUserQuestion.push(new UserQuestion("ruty","sdfghj","dfg@fghj","fghj","sdfghj","dfghj",1));
    this.arrUserQuestion.push(new UserQuestion("dfgh","yyyyy","kkkkkkkk","ccccccccc","fffffff","ooo",2));
   }

   GetAllUserQuestions():Observable<UserQuestion[]>{
    return this.http.get<UserQuestion[]>(`http://localhost:51944/api/Question/GetQuestions`);

   }
   GetQuestionById(id:number):Observable<UserQuestion>{
     return this.http.get<UserQuestion>(`http://localhost:51944/api/Question/GetQuestion/`+id);
   }



//הטוב
  // GetAllUserQuestions():Observable<UserQuestion[]>{
  //   return this.http.get(`http://localhost:51944/api/User/Questions`).pipe(map((response: UserQuestion[]) => response));
  // }
}
