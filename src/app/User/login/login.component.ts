import { OnInit, Input, Component, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { Route } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';
import { Observable } from 'rxjs';
import { ProffestionService } from 'src/app/Proffestion/proffestion.service';
import { Proffestion } from 'src/app/Proffestion/proffestion.model';


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
  Proffestion: Proffestion[] = [];
  SignInUp: string = "signUp";
  constructor(private userService: UserService, private router: Router,private proffestionService:ProffestionService) { }

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
// כפתור כניסה למערכת
ConSumbit() {
     if (this.CheckSignInUp() == true)
     {
        if (this.form.valid)
        {
          this.userService.SignUp(<User>this.form.value).subscribe(x=>{
              console.log(x);
              // this.proffestionService.GetAll().subscribe(res=>{
              //   console.log(res);
              //   this.Proffestion=res;
              // });
          });
        }
     }
    else
      if (this.form.controls['userName'].valid && this.form.controls['userPassword'].valid)
      {
          this.userService.SignIn(this.form.controls['userName'].value, this.form.controls['userPassword'].value).subscribe(x=>{
          console.log(x)
         });
      }
  }
  EnterSubmit()
  {
    if(this.form.controls['userKind'].value=="מורה")
        this.router.navigate(['questions']);
    else
      this.router.navigate(['questions']);
  }
  ngOnInit(): void {
    // אתחול טופס הרשמה לאתר
    this.form = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      userPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      userEmail: new FormControl('', [Validators.required, Validators.email]),
      userKind: new FormControl('', Validators.required)
    });
      this.proffestionService.GetAll().subscribe(res=>{
                console.log(res);
                this.Proffestion=res;
              });
  }
}








