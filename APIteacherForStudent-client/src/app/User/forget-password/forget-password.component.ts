import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { NewPasswordUser } from '../NewPasswordUser.model';
import { Route, Router } from '@angular/router';
import { User } from '../user.model';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }
  firstPassword: string;
  secondPassword: string;
  errorPassword: string;
  hide = true;
  ifErrPasswordLenght: boolean;
  IfUserName: boolean;
  UserName: string = null;
  errRequeridUserName: boolean;
  ifButtonContinue: boolean;
  newPasswordUser: NewPasswordUser;
  userMail: string = null;
  userEnter: User;
  Code: string = null;
  changePaswword: boolean;
  errRequiredNewP: string;
  errCode: string;
  ChangeResult: string = '';

  // checkError(controlName: string, errorName: string) {
  //   return this.form.controls[controlName].hasError(errorName);
  // }
  // continue to write new password to user
  ContinueNewPassword() {
    debugger
    if (this.UserName != null && this.UserName != '' && this.userMail != null && this.userMail != '') {
      this.IfUserName = false;
      this.IfUserName = false;
      this.ifButtonContinue = false;
      this.errRequeridUserName = false;
      this.sendMail();
    }
    else this.errRequeridUserName = true;
  }
// back
  backToEnter() {
    this.router.navigate(['/signIn']);
  }

  // send email to user
  sendMail() {
    debugger
    this.userService.SendEmail(this.userMail, this.userEnter).subscribe(x => {
      console.log(x);
    })
  }

  // write code that get in email
  ContinueChangePassword() {
    this.errCode = '';
    if (this.Code == "325$2%85")
      this.changePaswword = true;
    else this.errCode = "קוד האימות שגוי";
  }

// update user password
  UpdatePassword() {
    this.errRequiredNewP = '';
    debugger
    this.ifErrPasswordLenght = false;
    if (this.firstPassword != undefined) {
      if (this.firstPassword.length < 8)
        this.ifErrPasswordLenght = true;
      else if (this.firstPassword != this.secondPassword)
        this.errorPassword = "הסיסמאות אינם מתאימות זו לזו, אנא הקש שוב";
      else {
        this.ifErrPasswordLenght = false;
        this.errorPassword = "";
        this.newPasswordUser = new NewPasswordUser(this.UserName, this.firstPassword);
        this.userService.newPasswordUser(this.newPasswordUser).subscribe(x => {
          debugger
          console.log(x);
          if (x == "השינוי עודכן בהצלחה")
            this.ChangeResult = "השינוי עודכן בהצלחה";
          else
            this.ChangeResult="הפעולה נכשלה, אנא נסה שוב";
        });
      }
    }
    else this.errRequiredNewP = "אלו שדות חובה";
  }


  ngOnInit(): void {
    this.errCode = "";
    this.errRequiredNewP = '';
    this.changePaswword = false;
    this.userEnter = JSON.parse(sessionStorage.getItem("CurrentUser"));
    this.ifButtonContinue = true
    this.errRequeridUserName = false;
    this.IfUserName = true;
    this.ifErrPasswordLenght = false;
  }

}
