import {  OnInit ,Input, Component, Output, EventEmitter} from '@angular/core';
import { FormControl, Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }
  hide = true;
  
  form: FormGroup = new FormGroup({
    'password':new FormControl('',[Validators.required,Validators.minLength(8)],[]),
    'email' : new FormControl('', [Validators.required, Validators.email]),
    'userName':new FormControl('',[Validators.required,Validators.maxLength(10)])
  });
  
  getErrorMessageUserName(){
    if(this.form['userName'].hasError('required'))
      return 'חובה להחזיר ערך';
    return this.form['userName'].hasError('userName')?'מקסימום 10 תווים':'';
  }
  getErrorMessageEmail() {
    if (this.form['email'].hasError('required')) {
      return 'חובה להחזיר ערך';
    }
    return this.form['email'].hasError('email') ? 'כתובת לא חוקית' : '';
  }
  getErrorMessagePassword() {
    if (this.form['password'].hasError('required')) {
      return 'חובה להחזיר ערך';
    }
    return this.form['password'].hasError('minLength()') ? 'מינימום 8 תווים' : '';
  }

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

  ngOnInit(): void {
  }

}








