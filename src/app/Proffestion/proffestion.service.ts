import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proffestion } from './proffestion.model';

@Injectable({
  providedIn: 'root'
})
export class ProffestionService {

  constructor(private http:HttpClient) { }
  GetAll():Observable<Proffestion[]>
  {
      return this.http.get<Proffestion[]>('http://localhost:51944/api/Proffestion');
  }
}
