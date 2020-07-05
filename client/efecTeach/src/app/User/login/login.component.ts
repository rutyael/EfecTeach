import { OnInit, Input, Component, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { Route } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';
import { Observable } from 'rxjs';


// סטטוס משתמש
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
  IsExists: Boolean = false;
  form: FormGroup;
  hide = true;
  user:User=null;
  

  SignInUp: string = "signUp";
  constructor(private userService: UserService, private router: Router) { }

  // בחירה משתמש-כניסה או הרשמה 
  CheckSignInUp() {
    if (this.router.url == "/signIn")
      return false;
    else
      return true;
  }
  // שינוי הנתיב מכניסה להרשמה ולהיפך
  relativeTo(path: string) {
    this.router.navigate([path]);
  }
  // בדיקת תקינות שדות הרשמה לאתר
  checkError(controlName: string, errorName: string) {
    return this.form.controls[controlName].hasError(errorName);
  }
  // מערך סטטוס משתמש
  users: UserInterface[] = [
    { name: 'מורה', messege: 'שלום מורה!' },
    { name: 'תלמיד', messege: 'שלום תלמיד!' }
  ];
   ErrorUniqeName:string=null;
   ErrorUniqeMail:string=null;
// כפתור כניסה למערכת
  submit() {
    //כפתור הרשמה
    let errorUserDetail:object;
    if (this.form.valid) {
      if (this.CheckSignInUp() == true)
      {
        console.log(errorUserDetail);
        this.user=this.form.value;
        this.user.UserKind=this.form.controls['UserKind'].value.name;
        this.userService.SignUp(<User>this.user).subscribe(x=>{
          console.log(x);
          if(this.form.controls['UserKind'].value.name=="מורה")
          this.router.navigate(['questions']);
         else this.router.navigate(['AskQuestion']);
        });
      }
    }
    // כפתור כניסה
    if (this.CheckSignInUp() == false)
      if (this.form.controls['UserName'].valid && this.form.controls['UserPassword'].valid)
      {
        this.userService.SignIn(this.form.controls['UserName'].value, this.form.controls['UserPassword'].value).subscribe(x=>{
          console.log(x);
          if(x.UserKind=="מורה")
            this.router.navigate(['questions']);
          else
           this.router.navigate(['AskQuestion'])
        },err=>{
          console.log(err)});      
      }
  }
  ngOnInit(): void {
    // אתחול טופס הרשמה לאתר
    this.form = new FormGroup({
      UserName: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      UserPassword: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      UserMail: new FormControl('', [Validators.required, Validators.email]),
      UserKind: new FormControl('', Validators.required)
    });

  }
}








