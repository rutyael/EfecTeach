import { OnInit, Input, Component, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';
import { Observable } from 'rxjs';
import { Secretary } from '../Secretary.model';
import { environment } from 'src/environments/environment';
import { data } from 'jquery';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';


// Userstatus
interface UserInterface {
  name: string;
  messege: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Array to user Status
  users: UserInterface[] = [
    { name: 'מורה', messege: 'שלום מורה!' },
    { name: 'תלמיד', messege: 'שלום תלמיד!' },
    { name: 'מזכיר', messege: 'שלום מזכיר!' },
    { name: 'אחר', messege: '' }
  ];

  IsExists: Boolean = false;
  form: FormGroup;
  hide: boolean = true;
  hide2: boolean = true;
  user: User = null;
  secretary: Secretary = null;
  errorUserUnique: string = "";
  appLaunch: boolean;
  CurrentUser: User = null;
  SignInUp: string = "signUp";
  Entered: boolean = false;
  ifClickEnter: boolean = false;
  ErrorUniqeName: string = null;
  ErrorUniqeMail: string = null;
  constructor(private userService: UserService, private router: Router, private dialog: MatDialog) { }
// if user forgot password
  forgetPassword() {
    this.router.navigate(["forgotPassword"]);
  }

  // Select User-Login or Register
  CheckSignInUp() {
    if (this.router.url == "/signIn")
      return false;
    else
      return true;
  }
  // Changing the path enters registration and vice versa
  relativeTo(path: string) {
    this.router.navigate([path]);
  }

  // Password verification check
  ifConfirmPassword(controlName: string) {
    if (this.form.controls["UserPassword"].value == this.form.controls[controlName].value)
      return false;
    else {
      return true;
    }
  }
  // Checking the integrity of registration fields
  checkError(controlName: string, errorName: string) {
    return this.form.controls[controlName].hasError(errorName);
  }
  // if there are new apdate to user
  NewUpdates(user: User) {
    debugger
    if (user == undefined || user.NewData == false)
      return;
    var template = user.UserKind == "מורה" ?
      `נמצאו עדכונים חדשים <br> למעבר לחץ להמשך` : 'ברוך הבא! <br> אנו שמחים להודיע לך כי מזכיר המוסד אישר את התחברותך למערכת <br> כעת יש באפשרותך להינות ממגוון אפשרויות לתלמיד';
    const dialogRef = user.UserKind == "מורה" ?
      this.dialog.open(DialogComponent, { data: { template: template, actions: [true, true], teacher:'T' }, disableClose: true }) : this.dialog.open(DialogComponent, { data: { template: template, actions: [true, false] }, disableClose: true })
    dialogRef.afterClosed().subscribe(res => {
      user.NewData = false;
      sessionStorage.setItem("CurrentUser", JSON.stringify(this.user));
    });
  }
  // Click on Login or Register
  submit() {
    debugger
    this.errorUserUnique = "";
    this.ifClickEnter = true;
    //Click on Register
    if (this.form.valid && this.ifConfirmPassword('ConfirmUserPassword') == false) {    
      this.appLaunch = true;
      if (this.CheckSignInUp() == true) {
        this.user = this.form.value;
        this.user.LoginDate = new Date;
        this.user.LastEnteryDate = new Date;
        this.user.NewData = false;
        this.user.UserKind = this.form.controls['UserKind'].value.name;
        if (this.form.controls['UserKind'].value.name != "מזכיר") {
          this.userService.SignUp(<User>this.user).subscribe(x => {
            sessionStorage.setItem("SearchQuestion", JSON.stringify({ string: '', lang: -1 }));
            console.log(x);
            sessionStorage.setItem("CurrentUser", JSON.stringify(x));
            sessionStorage.setItem("first", "1");
            switch (x.UserKind) {
              case 'מורה': sessionStorage.setItem("stat", 'T'); break;
              case 'תלמיד': sessionStorage.setItem("stat", 'S');; break;
              default: sessionStorage.setItem("stat", 'O');; this.router.navigate(['AskQuestion']);
            }
            this.Entered = true;
          }, err => {
            this.errorUserUnique = err.error.Message;
            console.log(err.error.Message);
            this.ifClickEnter = false;
          });
        }
        else {
          this.secretary = new Secretary(0, this.form.controls['UserName'].value, this.form.controls['UserPassword'].value, this.form.controls['UserMail'].value, null);
          this.userService.SignUpSecretary(<Secretary>this.secretary).subscribe(x => {
            console.log(x);
            sessionStorage.setItem("SearchQuestion", '');
            sessionStorage.setItem("CurrentSchool",'');
            sessionStorage.setItem("CurrentUser", JSON.stringify(x));
            sessionStorage.setItem("stat", 'SE');
            this.router.navigate(['RegistrationDetailsSecretary']);
          }, err => {
            this.errorUserUnique = err.error.Message;
            console.log(err.error.Message);
            this.ifClickEnter = false;
          })
        }
      }
    }
    else this.ifClickEnter = false;
    // Click on Login
    if (this.CheckSignInUp() == false)
      if (this.form.controls['UserName'].valid && this.form.controls['UserPassword'].valid) {
        this.appLaunch = true;
        debugger
        this.ifClickEnter = true;
        this.userService.SignIn(this.form.controls['UserName'].value, this.form.controls['UserPassword'].value).subscribe(x => {
          debugger
          console.log(x);
          if (x == null) {
            this.errorUserUnique = "משתמש זה אינו קיים במערכת, בדוק את שם המשתמש והסיסמא";
            this.ifClickEnter = false;
          }
          else {
            sessionStorage.setItem("first", "0");
            sessionStorage.setItem("SearchQuestion", JSON.stringify({ string: '', lang: -1 }));
            if (x.ifISecretary == true) {
              this.router.navigate([`school/${x.secretary.SchoolId}/UpdateDetailsSecretary`]);
              sessionStorage.setItem("CurrentUser", JSON.stringify(x.secretary));
              sessionStorage.setItem("stat", 'SE');
            }
            else {
              debugger
              sessionStorage.setItem("CurrentUser", JSON.stringify(x.user));
              sessionStorage.setItem("SearchQuestion", JSON.stringify({ string: '', lang: -1 }));
              switch (x.user.UserKind) {
                case 'תלמיד': this.NewUpdates(x.user); sessionStorage.setItem("stat", 'S'); this.router.navigate(['AskQuestion']); break;
                case 'מורה': this.NewUpdates(x.user); sessionStorage.setItem("stat", 'T'); this.router.navigate(['questions']); break;
                default: sessionStorage.setItem("stat", 'O'); this.router.navigate(['AskQuestion']);
              }
            }
          }

        }, err => {
          this.errorUserUnique = "משתמש זה אינו קיים במערכת, בדוק את השם והסיסמא";
          this.ifClickEnter = false;
        })
      }
      else this.ifClickEnter = false;
  }
  ngOnInit(): void {
    this.appLaunch = false;
    this.ifClickEnter = false;
    this.form = new FormGroup({
      UserName: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      UserPassword: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      ConfirmUserPassword: new FormControl('', [Validators.required]),
      UserMail: new FormControl('', [Validators.required, Validators.email]),
      UserKind: new FormControl('', Validators.required),
    })
  }
}








