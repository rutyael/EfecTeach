import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
// import { userInfo } from 'os';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  UserMails:string[]=[];
  userEnter=new EventEmitter<User>();
  constructor(private http:HttpClient) {

  }
  // GetUsers():Observable<User[]>
  // {
  //    return this.http.get<User[]>(`http://localhost:51944/api/User`);
  // }


  SignIn(username:string,userpassword:string):Observable<User> { 
    // this.userService.user.subscribe
        return this.http.get<User>(`http://localhost:51944/api/User?password=${userpassword}&name=${username}`);

  }


  SignUp(postuser: User):Observable<any> {
       return this.http.post(`http://localhost:51944/api/User`,postuser);
  }
  userEntered(user:User){
    this.userEnter.emit(user);
    console.log(this.userEnter);
  }
}
