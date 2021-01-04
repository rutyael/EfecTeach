import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { School } from './School.model';
import { Observable } from 'rxjs';
import { classToSchool } from './classToSchool.model';
import { ApdateSchool } from './ApdateSchool.model';
import { ClassesJoinUser } from '../User/ClassesJoinUser.model';
import { User } from '../User/user.model';
import { UserJoinClassesToSet } from './UserJoinClassesToSet.model';
import { UserToClass } from './user-to-class.model';


@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private http: HttpClient) {}

  GetSchools(): Observable<School[]> {
    return this.http.get<School[]>(`http://localhost:51944/api/School`);
  }
  GetClassToSchool(schoolId: number): Observable<classToSchool[]> {
    return this.http.get<classToSchool[]>(`http://localhost:51944/api/School?id=${schoolId}`);
  }
  PostSchool(postSchool: School): Observable<any> {
    return this.http.post<School>(`http://localhost:51944/api/School`, postSchool);
  }
  GetSchoolByIdSecretary(id: number): Observable<School> {
    return this.http.get<School>(`http://localhost:51944/api/School?IdSecretary=${id}`);
  }

  PutSchool(school: ApdateSchool): Observable<School> {
    return this.http.put<School>(`http://localhost:51944/api/School/PutClassesToSchool`, school);
  }
  PutClassesToUser( classes: UserToClass[]):Observable<object> {
    return this.http.put<UserToClass[]>(`http://localhost:51944/api/School/PutClassesToUser`, classes);
     
  }
  GetClassesToUser(idUser): Observable<ClassesJoinUser[]> {
    return this.http.get<ClassesJoinUser[]>(`http://localhost:51944/api/School?IdUser=${idUser}`);
  }
  GetSchool(SecretaryId: number): Observable<School> {
    return this.http.get<School>(`http://localhost:51944/api/School?IdSecretary=${SecretaryId}`);
  }
  GetStudentsJoinClassToSet(SchoolId: number) : Observable<UserJoinClassesToSet[]>{
      return this.http.get<UserJoinClassesToSet[]>(`http://localhost:51944/api/Student?SchoolId=${SchoolId}`)
  }
  GetTeachersJoinClassesToSet(SchoolId: number): Observable<UserJoinClassesToSet[]> {
    return this.http.get<UserJoinClassesToSet[]>(`http://localhost:51944/api/Teacher?SchoolId=${SchoolId}`);
  }
  PutClassesToTeacher(classes:UserToClass[]):Observable<any>
  {
    debugger
    return this.http.put<any>(`http://localhost:51944/api/Teacher`,classes);
  }
  PutClassesToStudent(classes:UserToClass[]):Observable<any>
  {
    debugger
    return this.http.put<any>(`http://localhost:51944/api/Student`,classes);
  }
  
}
