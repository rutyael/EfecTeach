import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// סטטוס משתמש
interface UserInterface {
  name: string;
  messege: string;
}

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  form: FormGroup;
  hide = true;
  constructor() { }

  submit() {
    // if (this.form.valid) {
    //   this.submitEM.emit(this.form.value);
    // }
  }

  // בדיקת תקינות שדות הרשמה לאתר
  checkError (controlName: string, errorName: string)  {
    return this.form.controls[controlName].hasError(errorName);
  }
  // מערך סטטוס משתמש
  users: UserInterface[] = [
    {name: 'מורה', messege: 'שלום מורה!'},
    {name: 'תלמיד', messege: 'שלום תלמיד!'},

  ];

  ngOnInit(): void {
    // אתחול טופס הרשמה לאתר
    this.form = new FormGroup({
      username: new FormControl('',[Validators.required,Validators.maxLength(10)]),
      password: new FormControl('',[Validators.required,Validators.minLength(8)]), 
      email: new FormControl('', [Validators.required, Validators.email]),
      userStatusControl : new FormControl('', Validators.required)
    });
  }



}
