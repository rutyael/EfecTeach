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
  SignUp(postuser: User):Observable<any> {
    // let IsExists:boolean=false;
    // this.users.forEach(function (value, key) {
    //   if (value != null) {
    //     if ((value as User).userEmail == postuser.userEmail||(value as User).userName == postuser.userName)
    //     {
    //       IsExists=true;
    //     }
    //   }
    // });
    //     if(IsExists==false)
    //     this.users.push(postuser);        
    // // return IsExists;
    let data={
      UserId: "12345678",
UserKind: "מורה",
UserMail: "y0556702539@gmail.com",
UserName: "yael",
UserPassword: "208095877",
  }

   return  this.http.post(`http://localhost:51944/api/User`,data);

    // console.log(this.users);s
  }
}
