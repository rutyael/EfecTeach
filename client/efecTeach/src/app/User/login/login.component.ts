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

  SignInUp: string = "signUp";
  constructor(private userService: UserService, private router: Router) { }

  // בחירה משתמש-כניסה או הרשמה 
  CheckSignInUp() {
    if (this.router.url == "/signIn")
      return false;
    else
      return true;
  }
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

  submit() {
    if (this.form.valid) {
      if (this.CheckSignInUp() == true)
       this.userService.SignUp(<User>this.form.value).subscribe(x=>{
         console.log(x);
       });
    }
    if (this.CheckSignInUp() == false)
      if (this.form.controls['userName'].valid && this.form.controls['userPassword'])
        this.userService.SignIn(this.form.controls['userName'].value, this.form.controls['userPassword'].value).subscribe(x=>{
        console.log(x)
        });
  }
  ngOnInit(): void {
    // אתחול טופס הרשמה לאתר
    this.form = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      userPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      userEmail: new FormControl('', [Validators.required, Validators.email]),
      userKind: new FormControl('', Validators.required)
    });
  }
}








