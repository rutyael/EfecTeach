import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proffestion } from './proffestion.model';
import { ProffestionJoinTeacher } from './proffestionJoinTeacher.model';
import { TeacherClassProffestion } from './TeacherClassProffestion';
@Injectable({
  providedIn: 'root'
})
export class ProffestionService {
  // PutTeacherToClassProffestions(proffestions: TeacherClassProffestion[],cid) {
  //   this.http.post(`http://localhost:51944/api/Proffestion`, proffestions,para );
  // }

  constructor(private http: HttpClient) { }
  GetAll(): Observable<Proffestion[]> {
    return this.http.get<Proffestion[]>('http://localhost:51944/api/Proffestion');
  }
  GetProffestionById(id: number): Observable<Proffestion> {
    return this.http.get<Proffestion>(`http://localhost:51944/api/Proffestion?id=${id}`);
  }
  GetProffestionToTeacher(idTeacher: number): Observable<ProffestionJoinTeacher[]> {
    return this.http.get<ProffestionJoinTeacher[]>(`http://localhost:51944/api/Proffestion?TeacherId=${idTeacher}`);
  }
  PutProffestionToTeacher(proffestions: ProffestionJoinTeacher[]) {
    this.http.put(`http://localhost:51944/api/Proffestion`, proffestions).subscribe(res => {
      console.log(res);
    })
  }
  GetTeacherClassProffestions(ClassId: number, TeacherId: number): Observable<TeacherClassProffestion[]> {
    return this.http.get<TeacherClassProffestion[]>(`http://localhost:51944/api/Proffestion?TeacherId=${TeacherId}&ClassId=${ClassId}`)
  }
  AddProffestion(new_pr: Proffestion): Observable<Proffestion> {
    return this.http.post<Proffestion>(`http://localhost:51944/api/Proffestion`, new_pr);
  }
}
