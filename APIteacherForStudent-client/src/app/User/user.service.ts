import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { City } from './City.model';
import { Secretary } from './Secretary.model';
import { NewPasswordUser } from './NewPasswordUser.model';
import { UserReturn } from './UserReturn.model';
import { UserQuestion } from '../Question/user-question.model';
// import { userInfo } from 'os';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSelect: User = null;
  private secretarSelect: Secretary = null;
  UserMails: string[] = [];
  userEnter = new EventEmitter<User>();
  secretaryEnter = new EventEmitter<Secretary>();
  // newPassword:string=null;

  constructor(private http: HttpClient) {
    this.userEnter.subscribe(x => {
      this.userSelect = x;
    })
    this.secretaryEnter.subscribe(x => {
      this.secretarSelect = x;
    })
  }
  returnSelctUser(): User {
    return this.userSelect;
  }

  returnSelctSecetery(): Secretary {
    return this.secretarSelect;
  }

  SignIn(username: string, userpassword: string): Observable<UserReturn> {
    return this.http.get<UserReturn>(`http://localhost:51944/api/User?password=${userpassword}&name=${username}`);
  }

  newPasswordUser(newpasswordUser: NewPasswordUser) {
    return this.http.put(`http://localhost:51944/api/User`, newpasswordUser);
  }

  SignUp(postuser: User): Observable<any> {
    debugger
    return this.http.post(`http://localhost:51944/api/User`, postuser);
  }

  SignUpSecretary(postSecretary: Secretary): Observable<any> {
    return this.http.post(`http://localhost:51944/api/Secretary`, postSecretary);
  }

  userEntered(user: User) {
    this.userEnter.emit(user);
    console.log(this.userSelect);
  }

  SecretaryEnter(secretary: Secretary) {
    this.secretaryEnter.emit(secretary);
    console.log(this.secretarSelect);
  }
  GetCities(): Observable<City[]> {
    return this.http.get<City[]>(`http://localhost:51944/api/Cities`);
  }
  SendEmail(email:string,userEnter:User):Observable<void>{
    debugger
    return this.http.get<void>(`http://localhost:51944/api/Email?email=${email}&user=${userEnter}`);
  }
}
