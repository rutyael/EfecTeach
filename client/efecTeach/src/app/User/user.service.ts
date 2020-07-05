import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  UserMails:string[]=[];
  constructor(private http:HttpClient) {

  }
  // GetUsers():Observable<User[]>
  // {
  //    return this.http.get<User[]>(`http://localhost:51944/api/User`);
  // }


  SignIn(username:string,userpassword:string):Observable<User> { 
       return this.http.get<User>(`http://localhost:51944/api/User?password=${userpassword}&name=${username}`);
  }

  SignUp(postuser: User):Observable<any> {
   return  this.http.post(`http://localhost:51944/api/User`,postuser);
  }
}
