import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User = null;
  users: User[] = [];
  constructor(private http:HttpClient) {
  }
  SignIn(username:string,userpassword:string) :Observable<User>{ 
       return this.http.get<User>(`http://localhost:51944/api/User?password=${userpassword}&name=${username}`);
  }
  SignUp(postuser: User):Observable<User> {
    let data={
      "UserName": "uu",
      "UserPassword": "208095877",
      "UserMail": "1@gmail.com",
      "UserKind": "מורה"
  }
     return  this.http.post<User>(`http://localhost:51944/api/User`,data);

    // console.log(this.users);s
  }
}
